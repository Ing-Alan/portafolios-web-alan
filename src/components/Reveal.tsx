import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Desplazamiento vertical inicial en px */
  y?: number
  as?: 'div' | 'li' | 'article'
}

/**
 * Aparición suave al entrar en pantalla, una sola vez.
 * Con movimiento reducido se renderiza el contenido directo, sin animar.
 */
export function Reveal({ children, className, delay = 0, y = 16, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion()
  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </M>
  )
}
