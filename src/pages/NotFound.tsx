import { Link, useLocation } from 'react-router-dom'
import { site } from '@/data/site'
import { profile } from '@/data/profile'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

export function NotFound() {
  const { pathname } = useLocation()
  const t = site.notFound
  useDocumentMeta(`${t.title} · ${profile.name}`)

  return (
    <section className="blueprint border-b border-rule">
      <div className="container-x flex min-h-[60vh] flex-col items-start justify-center py-20">
        <div className="panel w-full max-w-[560px]">
          <div className="panel-head">
            <b>{t.panelTitle}</b> · {t.panelSubtitle}
            <span className="ml-auto inline-flex items-center gap-[7px] font-bold text-err">
              <span aria-hidden="true" className="inline-block size-2 rounded-full bg-err" />
              404
            </span>
          </div>
          <div className="term m-4">
            <span className="text-accent">$</span> {t.command}
            <span className="break-all">{pathname}</span>
            <br />
            <span className="font-bold text-err">{t.error}</span> <span className="caret" aria-hidden="true" />
          </div>
        </div>
        <h1 className="m-0 mt-8 text-[clamp(1.8rem,4.5vw,3rem)] font-extrabold leading-tight tracking-[-0.035em]">{t.title}</h1>
        <p className="m-0 mt-3 max-w-[52ch] text-muted">{t.text}</p>
        <Link to="/" className="btn btn-pri mt-7">
          {t.cta}
        </Link>
      </div>
    </section>
  )
}
