import { site } from '@/data/site'
import { profile } from '@/data/profile'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-rule bg-surface">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-6 gap-y-3 px-4 py-8 text-[13px] text-muted sm:px-6 lg:px-10">
        <Logo />
        <p className="m-0">
          © {year} {profile.name}. {site.footer.note}
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0 })}
          className="ml-auto cursor-pointer rounded font-semibold hover:text-ink"
        >
          {site.footer.backToTop}
        </button>
      </div>
    </footer>
  )
}
