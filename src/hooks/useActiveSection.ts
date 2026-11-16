import { useEffect, useState } from 'react'

/**
 * Devuelve el id de la sección que cruza la franja central de la pantalla,
 * o null si ninguna de las indicadas está ahí.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    const list = key ? key.split(',') : []
    if (!list.length) {
      setActive(null)
      return
    }
    const visible = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        }
        setActive(list.find((id) => visible.has(id)) ?? null)
      },
      // Franja angosta a ~40% de la altura: una sola sección a la vez
      { rootMargin: '-40% 0px -55% 0px' },
    )
    list.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [key])

  return active
}
