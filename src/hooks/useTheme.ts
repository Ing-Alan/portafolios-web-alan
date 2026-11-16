import { createContext, useContext } from 'react'

export type ThemeChoice = 'system' | 'light' | 'dark'

/** Misma clave que lee el script inline de index.html. */
export const THEME_STORAGE_KEY = 'theme'

export interface ThemeContextValue {
  theme: ThemeChoice
  setTheme: (t: ThemeChoice) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function readStoredTheme(): ThemeChoice {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY)
    return v === 'light' || v === 'dark' ? v : 'system'
  } catch {
    return 'system'
  }
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme debe usarse dentro de <ThemeProvider>')
  return ctx
}
