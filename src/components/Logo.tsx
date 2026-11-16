import { Link } from 'react-router-dom'
import { site } from '@/data/site'

export function Logo() {
  return (
    <Link
      to="/"
      aria-label={site.logo.label}
      className="rounded font-mono text-[15px] font-bold tracking-[0.02em] text-ink no-underline"
    >
      {site.logo.name}
      <span className="text-accent">.</span>
      {site.logo.tld}
    </Link>
  )
}
