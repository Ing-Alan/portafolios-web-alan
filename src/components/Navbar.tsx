import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { site } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

const SECTION_IDS = site.nav.links.map((l) => l.id)
const NONE: string[] = []

export function Navbar() {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const btnRef = useRef<HTMLButtonElement>(null)
  const { pathname, hash } = useLocation()
  const reduce = useReducedMotion()
  const active = useActiveSection(pathname === '/' ? SECTION_IDS : NONE)

  // Cerrar al navegar
  useEffect(() => setOpen(false), [pathname, hash])

  // Cerrar con Escape y devolver el foco al botón
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Desde cualquier página los links llevan al inicio + sección
  const links = site.nav.links.map((l) => ({ ...l, to: { pathname: '/', hash: `#${l.id}` } }))

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg/85 backdrop-blur-md">
      <nav aria-label={site.nav.ariaLabel} className="container-x flex items-center gap-4 py-3.5">
        <Logo />

        <ul className="m-0 ml-auto hidden list-none items-center gap-5 p-0 text-[13.5px] font-semibold text-muted nav:flex">
          {links.map((l) => {
            const current = active === l.id
            return (
              <li key={l.id}>
                <Link
                  to={l.to}
                  aria-current={current ? 'location' : undefined}
                  className={`relative rounded py-1 transition-colors hover:text-ink ${current ? 'text-ink' : ''}`}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-[3px] h-[2px] rounded-full bg-accent transition-transform duration-300 ${
                      current ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="hidden nav:block">
          <ThemeToggle />
        </div>

        <button
          ref={btnRef}
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? site.nav.menuClose : site.nav.menuOpen}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-rule bg-surface text-ink nav:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? <path d="M4 4l10 10M14 4L4 14" /> : <path d="M2.5 5h13M2.5 9h13M2.5 13h13" />}
          </svg>
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={menuId}
            key="menu"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden border-t border-rule bg-surface nav:hidden"
          >
            <ul className="container-x m-0 flex list-none flex-col py-2">
              {links.map((l) => (
                <li key={l.id}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    aria-current={active === l.id ? 'location' : undefined}
                    className={`block rounded border-b border-dashed border-rule py-3 font-semibold ${
                      active === l.id ? 'text-accent' : 'text-ink'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="container-x pb-4 pt-2">
              <ThemeToggle />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
