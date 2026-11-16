import { useCallback, useEffect, useImperativeHandle, useRef, type Ref } from 'react'
import { buildNanduti, paintNanduti, radiusFor, type NandutiGeometry, type RadiusMode } from './nanduti/geometry'

export interface NandutiHandle {
  /** Vuelve a tejer el ñandutí desde cero (o lo dibuja completo con movimiento reducido). */
  replay: () => void
}

export interface NandutiProps {
  /** Centro horizontal, en proporción del contenedor (0–1; puede salirse, ej. 1 = borde derecho) */
  cx?: number
  /** Centro vertical, en proporción del contenedor */
  cy?: number
  /** Radio, en proporción del lado de referencia (ver radiusMode) */
  radius?: number
  /** Opacidad del trazo (0–1) */
  opacity?: number
  /** Cantidad de rayos (urdimbre) */
  spokes?: number
  /** Cantidad de anillos */
  rings?: number
  /** 'min': relativo al lado menor. 'width': relativo al ancho (para que salga por un borde) */
  radiusMode?: RadiusMode
  /** Duración del tejido en ms */
  duration?: number
  /** Tejer al montar; si es false se dibuja completo */
  weaveOnMount?: boolean
  /** Esperar a que el ñandutí entre en pantalla para tejerlo (una sola vez). Tiene prioridad sobre weaveOnMount. */
  weaveInView?: boolean
  className?: string
  ref?: Ref<NandutiHandle>
}

const MAX_DPR = 2
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Ñandutí (encaje paraguayo) generado en <canvas>. Decorativo: aria-hidden y sin capturar clics.
 * Se posiciona absoluto ocupando todo su contenedor, que debe tener position: relative.
 * Valores por defecto: Opción 1 "Consola" de la vista previa.
 */
export function Nanduti({
  cx = 0.1,
  cy = 0.55,
  radius = 0.6,
  opacity = 0.2,
  spokes = 40,
  rings = 7,
  radiusMode = 'min',
  duration = 2600,
  weaveOnMount = true,
  weaveInView = false,
  className = '',
  ref,
}: NandutiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const geoRef = useRef<NandutiGeometry | null>(null)
  const dprRef = useRef(1)
  const colorRef = useRef('')
  const progressRef = useRef(weaveOnMount || weaveInView ? 0 : 1)
  const rafRef = useRef(0)

  // Valores actuales accesibles desde callbacks estables
  const opacityRef = useRef(opacity)
  const durationRef = useRef(duration)
  opacityRef.current = opacity
  durationRef.current = duration

  const readColor = useCallback(() => {
    const c = canvasRef.current
    if (!c) return
    colorRef.current = getComputedStyle(c).getPropertyValue('--nanduti').trim() || '#5DB9F2'
  }, [])

  const draw = useCallback(() => {
    const c = canvasRef.current
    const g = geoRef.current
    const ctx = c?.getContext('2d')
    if (!ctx || !g) return
    paintNanduti(ctx, g, {
      color: colorRef.current,
      alpha: opacityRef.current,
      dpr: dprRef.current,
      progress: progressRef.current,
    })
  }, [])

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = 0
  }, [])

  const weave = useCallback(() => {
    stop()
    if (prefersReducedMotion()) {
      progressRef.current = 1
      draw()
      return
    }
    const ms = Math.max(1, durationRef.current)
    const t0 = performance.now()
    const frame = (now: number) => {
      const t = Math.min(1, (now - t0) / ms)
      progressRef.current = easeOutCubic(t)
      draw()
      rafRef.current = t < 1 ? requestAnimationFrame(frame) : 0
    }
    progressRef.current = 0
    rafRef.current = requestAnimationFrame(frame)
  }, [draw, stop])

  useImperativeHandle(ref, () => ({ replay: weave }), [weave])

  // Tamaño y geometría: solo se recalculan cuando cambia el tamaño o la forma
  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const resize = () => {
      const box = c.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      const w = Math.max(1, Math.round(box.width * dpr))
      const h = Math.max(1, Math.round(box.height * dpr))
      if (c.width !== w) c.width = w
      if (c.height !== h) c.height = h
      dprRef.current = dpr
      if (!colorRef.current) readColor()
      geoRef.current = buildNanduti(w * cx, h * cy, radiusFor(w, h, radius, radiusMode), spokes, rings)
      draw()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(c)
    return () => ro.disconnect()
  }, [cx, cy, radius, radiusMode, spokes, rings, draw, readColor])

  // Opacidad: solo redibujar
  useEffect(() => {
    if (!rafRef.current) draw()
  }, [opacity, draw])

  // Tema: data-theme en <html> (Claro/Oscuro) y preferencia del sistema (Sistema)
  useEffect(() => {
    const onTheme = () => {
      readColor()
      if (!rafRef.current) draw()
    }
    onTheme()
    const mo = new MutationObserver(onTheme)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', onTheme)
    return () => {
      mo.disconnect()
      mq.removeEventListener('change', onTheme)
    }
  }, [readColor, draw])

  // Movimiento reducido: si se activa durante la animación, completar el dibujo
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => {
      if (mq.matches && rafRef.current) {
        stop()
        progressRef.current = 1
        draw()
      }
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [draw, stop])

  // Tejido inicial (solo al montar)
  useEffect(() => {
    const c = canvasRef.current
    if (weaveInView && c) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect()
            weave()
          }
        },
        { threshold: 0.25 },
      )
      io.observe(c)
      return () => {
        io.disconnect()
        stop()
      }
    }
    if (weaveOnMount) weave()
    else {
      progressRef.current = 1
      draw()
    }
    return stop
    // Dependencias vacías a propósito: el tejido inicial ocurre solo al montar.
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
