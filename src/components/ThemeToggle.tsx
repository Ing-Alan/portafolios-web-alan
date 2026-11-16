import { site } from '@/data/site'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  return (
    <div
      role="group"
      aria-label={site.theme.groupLabel}
      className={`inline-flex rounded-full border border-rule bg-surface p-[3px] ${className}`}
    >
      {site.theme.options.map((o) => {
        const active = theme === o.value
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => setTheme(o.value)}
            className={`cursor-pointer rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${
              active ? 'bg-ink text-bg' : 'text-muted hover:text-ink'
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
