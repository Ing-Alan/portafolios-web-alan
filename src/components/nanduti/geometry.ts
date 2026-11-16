/*
  Geometría y pintado del ñandutí, portados de Referencia/vista-previa-inicio.html
  (funciones build y draw). Las fórmulas se mantienen idénticas para que el dibujo
  coincida con la vista previa.

  Rendimiento: la geometría se calcula una sola vez por tamaño. Cada polilínea guarda
  sus puntos en un Float64Array plano [x0, y0, x1, y1, …] y los largos acumulados de
  sus segmentos, así en cada frame no se recalculan distancias.
*/

export interface Polyline {
  /** Coordenadas planas: x0, y0, x1, y1, … */
  pts: Float64Array
  /** cum[i] = largo acumulado hasta el punto i (cum[0] = 0) */
  cum: Float64Array
  len: number
}

export interface NandutiGeometry {
  lines: Polyline[]
  total: number
}

type Pt = [number, number]

const polar = (cx: number, cy: number, r: number, a: number): Pt => [cx + r * Math.cos(a), cy + r * Math.sin(a)]

function toPolyline(points: Pt[]): Polyline {
  const n = points.length
  const pts = new Float64Array(n * 2)
  const cum = new Float64Array(n)
  let acc = 0
  let px = 0
  let py = 0
  points.forEach(([x, y], i) => {
    pts[i * 2] = x
    pts[i * 2 + 1] = y
    if (i > 0) acc += Math.hypot(x - px, y - py)
    cum[i] = acc
    px = x
    py = y
  })
  return { pts, cum, len: acc }
}

/**
 * Construye el ñandutí en orden de tejido:
 * rosa central → rayos (urdimbre) → anillos y pétalos del centro hacia afuera → borde festoneado.
 */
export function buildNanduti(cx: number, cy: number, R: number, spokes: number, rings: number): NandutiGeometry {
  const L: Pt[][] = []
  const step = (Math.PI * 2) / spokes
  const r0 = R * 0.08

  const rs: number[] = []
  for (let i = 0; i <= rings; i++) rs.push(r0 + (R - r0) * Math.pow(i / rings, 0.92))

  // rosa central
  for (let k = 0; k < 8; k++) {
    const a = (k * Math.PI) / 4
    const pts: Pt[] = []
    for (let t = 0; t <= 16; t++) {
      const u = (t / 16) * Math.PI
      const rr = r0 * 1.6 * Math.sin(u)
      pts.push(polar(cx, cy, rr, a + (u - Math.PI / 2) * 0.28))
    }
    L.push(pts)
  }

  // rayos (urdimbre)
  for (let k = 0; k < spokes; k++) {
    const a = k * step
    L.push([polar(cx, cy, r0, a), polar(cx, cy, R * 1.04, a)])
  }

  // anillos y pétalos, del centro hacia afuera
  for (let i = 0; i < rings; i++) {
    const a1 = rs[i] ?? 0
    const a2 = rs[i + 1] ?? 0
    const ring: Pt[] = []
    for (let t = 0; t <= spokes * 4; t++) ring.push(polar(cx, cy, a1, (t * step) / 4))
    L.push(ring)
    const inv = i % 2 === 1
    for (let k = 0; k < spokes; k++) {
      const th = k * step
      const pts: Pt[] = []
      for (let t = 0; t <= 10; t++) {
        const u = t / 10
        const r = inv
          ? a2 - (a2 - a1) * Math.sin(u * Math.PI) * 0.92
          : a1 + (a2 - a1) * Math.sin(u * Math.PI) * 0.92
        pts.push(polar(cx, cy, r, th + u * step))
      }
      L.push(pts)
    }
  }

  // borde festoneado
  for (let k = 0; k < spokes; k++) {
    const th = k * step
    const pts: Pt[] = []
    for (let t = 0; t <= 10; t++) {
      const u = t / 10
      pts.push(polar(cx, cy, R + R * 0.06 * Math.sin(u * Math.PI), th + u * step))
    }
    L.push(pts)
  }

  const lines = L.map(toPolyline)
  return { lines, total: lines.reduce((s, l) => s + l.len, 0) }
}

export type RadiusMode = 'min' | 'width'

/** Radio en píxeles de canvas, igual que size() en la vista previa. */
export function radiusFor(w: number, h: number, radius: number, mode: RadiusMode): number {
  const base = mode === 'width' ? Math.max(w * 0.42, h * 0.5) : Math.min(w, h)
  return base * radius
}

export interface PaintOptions {
  color: string
  alpha: number
  dpr: number
  /** Progreso del tejido, 0–1 */
  progress: number
}

/** Pinta el ñandutí hasta `progress` del largo total (cada polilínea es un trazo, como en la vista previa). */
export function paintNanduti(ctx: CanvasRenderingContext2D, g: NandutiGeometry, o: PaintOptions): void {
  const { canvas } = ctx
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.strokeStyle = o.color
  ctx.globalAlpha = o.alpha
  ctx.lineWidth = o.dpr
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'

  let left = g.total * Math.min(1, Math.max(0, o.progress))

  for (const line of g.lines) {
    if (left <= 0) break
    const { pts, cum } = line
    const n = cum.length
    ctx.beginPath()
    ctx.moveTo(pts[0]!, pts[1]!)

    if (line.len <= left) {
      for (let j = 1; j < n; j++) ctx.lineTo(pts[j * 2]!, pts[j * 2 + 1]!)
      left -= line.len
    } else {
      // Trazo parcial: avanzar hasta el segmento donde se corta e interpolar
      let j = 1
      while (j < n && cum[j]! <= left) {
        ctx.lineTo(pts[j * 2]!, pts[j * 2 + 1]!)
        j++
      }
      if (j < n) {
        const segStart = cum[j - 1]!
        const segLen = cum[j]! - segStart
        const f = segLen > 0 ? (left - segStart) / segLen : 0
        const x0 = pts[(j - 1) * 2]!
        const y0 = pts[(j - 1) * 2 + 1]!
        ctx.lineTo(x0 + (pts[j * 2]! - x0) * f, y0 + (pts[j * 2 + 1]! - y0) * f)
      }
      left = 0
    }
    ctx.stroke()
  }
  ctx.globalAlpha = 1
}
