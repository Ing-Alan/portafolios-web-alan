import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import type { ProjectImage } from '@/data/types'

interface LightboxLabels {
  label: string
  close: string
  prev: string
  next: string
  of: string
}

interface LightboxProps {
  images: ProjectImage[]
  /** Índice abierto, o null si está cerrado */
  index: number | null
  onChange: (index: number) => void
  onClose: () => void
  labels: LightboxLabels
}

const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'

/** Visor ampliado: flechas ← → para navegar, Escape para cerrar, foco atrapado y devuelto al cerrar. */
export function Lightbox({ images, index, onChange, onClose, labels }: LightboxProps) {
  const open = index !== null
  const image = index !== null ? images[index] : undefined
  const reduce = useReducedMotion() ?? false
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const n = images.length

  // Foco: guardar el elemento previo, enfocar "Cerrar" y devolverlo al cerrar
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeRef.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [open])

  // Teclado
  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowRight') {
        onChange((index + 1) % n)
      } else if (e.key === 'ArrowLeft') {
        onChange((index - 1 + n) % n)
      } else if (e.key === 'Tab' && dialogRef.current) {
        const items = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
        const first = items[0]
        const last = items[items.length - 1]
        if (!first || !last) return
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, n, onChange, onClose])

  const navBtn =
    'grid size-11 cursor-pointer place-items-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20'

  return createPortal(
    <AnimatePresence>
      {open && image && index !== null && (
        <m.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[100] flex flex-col bg-[rgba(3,8,18,.92)] p-3 sm:p-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <div className="flex items-center gap-3 text-white">
            <p id={titleId} className="m-0 min-w-0 truncate font-display font-bold">
              <span className="sr-only">{labels.label}: </span>
              {image.title}
            </p>
            <span className="font-mono text-xs text-white/70">
              {index + 1} {labels.of} {n}
            </span>
            <button ref={closeRef} type="button" onClick={onClose} aria-label={labels.close} className={`${navBtn} ml-auto`}>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center py-3"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose()
            }}
          >
            <m.img
              key={image.src}
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              className="max-h-full max-w-full rounded-md object-contain shadow-2xl"
              initial={reduce ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            />
          </div>

          <div className="flex items-center justify-center gap-4">
            <button type="button" onClick={() => onChange((index - 1 + n) % n)} aria-label={labels.prev} className={navBtn}>
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" onClick={() => onChange((index + 1) % n)} aria-label={labels.next} className={navBtn}>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
