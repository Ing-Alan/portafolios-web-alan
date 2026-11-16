import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  intro?: string
  children: ReactNode
  /** Fondo alternativo para separar secciones */
  tone?: 'bg' | 'hero'
  className?: string
  /** Contenido de fondo (ej. ñandutí), detrás del contenido */
  background?: ReactNode
}

export function Section({ id, eyebrow, title, intro, children, tone = 'bg', className = '', background }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative overflow-hidden border-b border-rule py-[clamp(56px,8vw,104px)] ${
        tone === 'hero' ? 'bg-hero' : 'bg-bg'
      } ${className}`}
    >
      {background}
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow m-0">{eyebrow}</p>
          <h2 id={`${id}-title`} className="m-0 mt-2.5 text-[clamp(1.7rem,3.6vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.025em]">
            {title}
          </h2>
          {intro && <p className="m-0 mt-3 max-w-[62ch] text-muted">{intro}</p>}
        </Reveal>
        <div className="mt-[clamp(28px,4vw,44px)]">{children}</div>
      </div>
    </section>
  )
}
