import { Link, useLocation } from 'react-router-dom'
import { site } from '@/data/site'

export function NotFound() {
  const { pathname } = useLocation()
  const t = site.notFound
  return (
    <section className="mx-auto flex max-w-[1180px] flex-col items-start px-4 py-20 sm:px-6 lg:px-10">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-accent">{t.code}</p>
      <h1 className="mt-3 text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-tight tracking-[-0.035em]">{t.title}</h1>
      <p className="mt-3 max-w-[52ch] text-muted">{t.text}</p>

      <div className="mt-8 w-full max-w-[520px] overflow-hidden rounded-[10px] border border-rule bg-surface-2 px-3.5 py-3 font-mono text-[12.5px] font-medium [overflow-wrap:anywhere]">
        <span className="text-accent">$</span> {t.command}
        {pathname}
        <br />
        <span className="text-err">{t.error}</span>
      </div>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-[10px] bg-accent px-[18px] py-3 text-sm font-bold text-accent-ink"
      >
        {t.cta}
      </Link>
    </section>
  )
}
