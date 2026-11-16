import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ThemeContext, THEME_STORAGE_KEY, readStoredTheme, type ThemeChoice } from '@/hooks/useTheme'

/**
 * "system" → sin data-theme (el CSS sigue a prefers-color-scheme).
 * "light" / "dark" → data-theme en <html> y se recuerda en localStorage.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeChoice>(readStoredTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', theme)
    try {
      if (theme === 'system') localStorage.removeItem(THEME_STORAGE_KEY)
      else localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      /* almacenamiento bloqueado: el tema igual se aplica en esta sesión */
    }
  }, [theme])

  const value = useMemo(() => ({ theme, setTheme }), [theme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
