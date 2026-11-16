import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import type { Annotation, ProjectImage } from '@/data/types'

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

/** Centro de la etiqueta: el definido en los datos o uno calculado alejándose del punto. */
function labelPos(a: Annotation): { x: number; y: number } {
  return {
    x: a.lx ?? clamp(a.x < 50 ? a.x + 20 : a.x - 20, 12, 88),
    y: a.ly ?? clamp(a.y < 50 ? a.y + 15 : a.y - 15, 6, 94),
  }
}

interface AnnotatedShotProps {
  image: ProjectImage
  /** Texto de la barra del navegador */
  urlLabel: string
  zoomLabel: string
  annotationsLabel: string
  onOpen: () => void
}

/**
 * Captura en marco de navegador sobre fondo de plano técnico, con anotaciones.
 * Escritorio (≥1024px): líneas SVG que se dibujan (stroke-dashoffset) desde la etiqueta al punto.
 * Pantallas chicas: números sobre la imagen y lista numerada debajo.
 */
export function AnnotatedShot({ image, urlLabel, zoomLabel, annotationsLabel, onOpen }: AnnotatedShotProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const reduce = useReducedMotion() ?? false
  const show = reduce || inView
  const delayOf = (i: number) => 0.15 + i * 0.3

  return (
    <figure className="m-0">
      <div className="blueprint rounded-[14px] border border-rule p-[clamp(10px,3.5vw,40px)]">
        <div className="overflow-hidden rounded-[10px] border border-rule bg-surface shadow-[0_30px_60px_-40px_rgba(5,20,45,.55)]">
          <div className="browser-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>{urlLabel}</span>
          </div>

          <div ref={ref} className="relative">
            <button
              type="button"
              onClick={onOpen}
              aria-label={`${zoomLabel}: ${image.title}`}
              className="block w-full cursor-zoom-in p-0 focus-visible:outline-offset-[-3px]"
            >
              <img
                src={image.src}
                srcSet={`${image.srcSmall} ${image.smallWidth}w, ${image.src} ${image.width}w`}
                sizes="(min-width: 1180px) 1020px, 92vw"
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                alt={image.alt}
                className="block h-auto w-full"
              />
            </button>

            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              {/* Líneas (solo escritorio) */}
              <svg
                className="absolute inset-0 hidden h-full w-full overflow-visible lg:block"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {image.annotations.map((a, i) => {
                  const l = labelPos(a)
                  return (
                    <line
                      key={i}
                      x1={l.x}
                      y1={l.y}
                      x2={a.x}
                      y2={a.y}
                      pathLength={1}
                      stroke="var(--line)"
                      strokeWidth={1.5}
                      vectorEffect="non-scaling-stroke"
                      style={{
                        strokeDasharray: 1,
                        strokeDashoffset: show ? 0 : 1,
                        transition: reduce ? 'none' : `stroke-dashoffset .8s cubic-bezier(.22,1,.36,1) ${delayOf(i)}s`,
                      }}
                    />
                  )
                })}
              </svg>

              {/* Puntos numerados */}
              {image.annotations.map((a, i) => (
                <span
                  key={`p${i}`}
                  className="absolute grid size-[22px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-line bg-surface font-mono text-[11px] font-bold text-ink shadow-[0_4px_12px_-4px_rgba(5,20,45,.5)] transition-opacity duration-300"
                  style={{
                    left: `${a.x}%`,
                    top: `${a.y}%`,
                    opacity: show ? 1 : 0,
                    transitionDelay: reduce ? '0s' : `${delayOf(i)}s`,
                  }}
                >
                  {i + 1}
                </span>
              ))}

              {/* Etiquetas (solo escritorio) */}
              {image.annotations.map((a, i) => {
                const l = labelPos(a)
                return (
                  <span
                    key={`l${i}`}
                    className="absolute hidden w-max max-w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-md border border-line bg-surface px-2.5 py-1.5 font-mono text-[11.5px] font-semibold leading-snug text-ink shadow-[0_8px_20px_-14px_rgba(5,20,45,.6)] transition-opacity duration-500 lg:block"
                    style={{
                      left: `${l.x}%`,
                      top: `${l.y}%`,
                      opacity: show ? 1 : 0,
                      transitionDelay: reduce ? '0s' : `${delayOf(i) + 0.55}s`,
                    }}
                  >
                    <span className="text-accent">{i + 1}.</span> {a.text}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-4">
        <span className="block font-display text-[1.1rem] font-bold tracking-[-0.01em]">{image.title}</span>
        {/* Anotaciones como lista: visibles en pantallas chicas; en escritorio solo para lectores de pantalla */}
        <ol aria-label={annotationsLabel} className="m-0 mt-2.5 grid list-none gap-1.5 p-0 lg:sr-only">
          {image.annotations.map((a, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[14px]">
              <span
                aria-hidden="true"
                className="mt-0.5 grid size-[20px] flex-none place-items-center rounded-full border-2 border-line bg-surface font-mono text-[10.5px] font-bold"
              >
                {i + 1}
              </span>
              <span>{a.text}</span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  )
}
