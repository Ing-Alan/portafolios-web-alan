import { useEffect, useState } from 'react'

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* sigue con el respaldo */
  }
  // Respaldo: textarea temporal + execCommand (navegadores viejos o contexto no seguro)
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

interface CopyButtonProps {
  text: string
  labels: { copy: string; copied: string; failed: string }
  /** Texto accesible extra (ej. "email") */
  srContext?: string
}

export function CopyButton({ text, labels, srContext }: CopyButtonProps) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')

  useEffect(() => {
    if (state === 'idle') return
    const id = window.setTimeout(() => setState('idle'), 2200)
    return () => window.clearTimeout(id)
  }, [state])

  const label = state === 'copied' ? labels.copied : state === 'failed' ? labels.failed : labels.copy

  return (
    <button
      type="button"
      onClick={async () => setState((await copyText(text)) ? 'copied' : 'failed')}
      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-[12px] font-semibold transition-colors ${
        state === 'copied' ? 'border-ok text-ok' : 'border-rule text-ink hover:border-muted'
      }`}
    >
      <span aria-live="polite">{label}</span>
      {srContext && state === 'idle' && <span className="sr-only"> {srContext}</span>}
    </button>
  )
}
