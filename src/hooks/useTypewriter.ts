import { useEffect, useState } from 'react'

/**
 * Escribe `first`, hace una pausa y escribe `second` (como la terminal de la vista previa).
 * Con `instant` (movimiento reducido) devuelve ambos textos completos.
 */
export function useTypewriter(
  first: string,
  second: string,
  start: boolean,
  instant: boolean,
  { stepMs = 45, pauseSteps = 8 } = {},
): { a: string; b: string; done: boolean } {
  const total = first.length + pauseSteps + second.length
  const [i, setI] = useState(instant ? total : 0)

  useEffect(() => {
    if (instant) {
      setI(total)
      return
    }
    if (!start) return
    setI(0)
    const id = window.setInterval(() => {
      setI((n) => {
        if (n + 1 >= total) window.clearInterval(id)
        return Math.min(total, n + 1)
      })
    }, stepMs)
    return () => window.clearInterval(id)
  }, [start, instant, total, stepMs])

  const a = first.slice(0, Math.min(i, first.length))
  const bLen = Math.max(0, i - first.length - pauseSteps)
  return { a, b: second.slice(0, bLen), done: i >= total }
}
