import { site } from '@/data/site'
import { profile } from '@/data/profile'
import { contact } from '@/data/contact'
import { contactSection } from '@/data/sections'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()
  const f = site.footer
  const links = [
    { label: contactSection.linkedinLabel, href: contact.linkedin.href },
    { label: contactSection.githubLabel, href: contact.github.href },
    { label: f.repoLabel, href: f.repoUrl },
  ]
  return (
    <footer className="bg-surface">
      <div className="container-x flex flex-col gap-6 py-10 text-[13.5px] text-muted md:flex-row md:items-start md:justify-between">
        <div>
          <Logo />
          <p className="m-0 mt-3 font-semibold text-ink">{profile.name}</p>
          <p className="m-0 mt-1">{f.madeWith}</p>
          <p className="m-0 mt-1 font-mono text-xs">© {year}</p>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <ul aria-label={f.linksLabel} className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="rounded font-semibold text-ink hover:text-accent">
                  {l.label} ↗<span className="sr-only"> {f.newTab}</span>
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0 })
              document.getElementById('contenido')?.focus({ preventScroll: true })
            }}
            className="cursor-pointer rounded font-semibold hover:text-ink"
          >
            {f.backToTop}
          </button>
        </div>
      </div>
    </footer>
  )
}
