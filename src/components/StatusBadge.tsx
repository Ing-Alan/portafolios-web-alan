import type { ProjectStatus } from '@/data/types'

/** Punto de estado + texto: verde "En producción", ámbar "En implementación". */
export function StatusBadge({ status, tags = [] }: { status: ProjectStatus; tags?: string[] }) {
  const warn = status === 'En implementación'
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span className={`pill ${warn ? 'pill-warn' : ''}`}>
        <span className={`dot ${warn ? 'dot-warn' : ''}`} aria-hidden="true" />
        {status}
      </span>
      {tags.map((t) => (
        <span key={t} className="pill pill-neutral">
          {t}
        </span>
      ))}
    </span>
  )
}
