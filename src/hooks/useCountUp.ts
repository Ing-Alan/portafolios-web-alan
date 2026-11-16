import { useEffect, useState } from 'react'

/**
 * Cuenta de 0 a `target` cuando `start` pasa a true.
 * Si `instant` es true (movimiento reducido) devuelve el valor final directamente.
 */
export function useCountUp(target: number, start: boolean, instant: boolean, ms = 1200): number {
  const [value, setValue] = useState(instant ? target : 0)

  useEffect(() => {
    if (instant) {
      setValue(target)
      return
    }
    if (!start) return
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / ms)
      setValue(Math.round(target * t))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, start, instant, ms])

  return value
}
