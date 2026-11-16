import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { contact } from '@/data/contact'
import { contactSection } from '@/data/sections'

const t = contactSection.form

type Field = 'nombre' | 'email' | 'tipo' | 'mensaje'
type Values = Record<Field, string>
type Errors = Partial<Record<Field, string>>
type Status = 'idle' | 'sending' | 'success' | 'error'

const EMPTY: Values = { nombre: '', email: '', tipo: '', mensaje: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v: Values): Errors {
  const e: Errors = {}
  if (!v.nombre.trim()) e.nombre = t.errors.nameRequired
  if (!v.email.trim()) e.email = t.errors.emailRequired
  else if (!EMAIL_RE.test(v.email.trim())) e.email = t.errors.emailInvalid
  if (!v.tipo) e.tipo = t.errors.typeRequired
  if (!v.mensaje.trim()) e.mensaje = t.errors.messageRequired
  else if (v.mensaje.trim().length < 10) e.mensaje = t.errors.messageShort
  return e
}

const typeFromParam = (param: string | null) => contact.inquiryTypes.find((i) => i.id === param)?.label

/**
 * Formulario de contacto con Netlify Forms.
 * Envía por fetch (application/x-www-form-urlencoded con form-name) sin recargar la página.
 * Netlify detecta el formulario gracias a la copia estática oculta en index.html.
 */
export function ContactForm() {
  const [params] = useSearchParams()
  const tipoParam = params.get('tipo')
  const [values, setValues] = useState<Values>(() => ({ ...EMPTY, tipo: typeFromParam(tipoParam) ?? '' }))
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const uid = useId()

  // ?tipo=social (u otro) preselecciona el tipo de consulta, también si cambia sin recargar
  useEffect(() => {
    const label = typeFromParam(tipoParam)
    if (label) setValues((v) => ({ ...v, tipo: label }))
  }, [tipoParam])

  const errors = validate(values)
  const show = (f: Field) => (submitted || touched[f]) && errors[f]

  const set = (f: Field) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [f]: e.target.value }))
  const blur = (f: Field) => () => setTouched((tc) => ({ ...tc, [f]: true }))

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    const errs = validate(values)
    const firstInvalid = (Object.keys(errs) as Field[])[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('sending')
    const body = new URLSearchParams({
      'form-name': contact.formName,
      'bot-field': honeypot,
      nombre: values.nombre.trim(),
      email: values.email.trim(),
      tipo: values.tipo,
      mensaje: values.mensaje.trim(),
    }).toString()

    try {
      if (import.meta.env.DEV) {
        console.warn(t.devNotice, Object.fromEntries(new URLSearchParams(body)))
        await new Promise((r) => setTimeout(r, 700))
      } else {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
      }
      setStatus('success')
      setValues(EMPTY)
      setTouched({})
      setSubmitted(false)
    } catch {
      setStatus('error')
    }
  }

  useEffect(() => {
    if (status === 'success' || status === 'error') statusRef.current?.focus()
  }, [status])

  const inputCls = (f: Field) =>
    `w-full rounded-[10px] border bg-surface-2 px-3.5 py-2.5 text-[15px] text-ink placeholder:text-muted transition-colors focus-visible:border-accent ${
      show(f) ? 'border-err' : 'border-rule hover:border-muted'
    }`

  const fieldId = (f: Field) => `${uid}-${f}`
  const errId = (f: Field) => `${uid}-${f}-err`

  const ErrorMsg = ({ f }: { f: Field }) =>
    show(f) ? (
      <p id={errId(f)} className="m-0 mt-1.5 text-[13px] font-semibold text-err">
        {errors[f]}
      </p>
    ) : null

  const a11y = (f: Field) => ({
    id: fieldId(f),
    name: f,
    'aria-invalid': show(f) ? true : undefined,
    'aria-describedby': show(f) ? errId(f) : undefined,
    onBlur: blur(f),
  })

  if (status === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="panel p-6 outline-none">
        <p className="m-0 flex items-center gap-2.5 font-display text-[1.2rem] font-bold">
          <span aria-hidden="true" className="grid size-7 place-items-center rounded-full bg-ok-bg text-ok">
            ✓
          </span>
          {t.successTitle}
        </p>
        <p className="m-0 mt-2 text-muted">{t.successText}</p>
        <button type="button" onClick={() => setStatus('idle')} className="btn btn-sec mt-5">
          {t.sendAnother}
        </button>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      name={contact.formName}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      noValidate
      onSubmit={onSubmit}
      className="panel flex flex-col gap-4 p-[clamp(18px,3vw,26px)]"
      aria-labelledby={`${uid}-title`}
    >
      <h3 id={`${uid}-title`} className="m-0 text-[1.15rem] font-bold tracking-[-0.01em]">
        {t.title}
      </h3>
      <input type="hidden" name="form-name" value={contact.formName} />

      {/* Honeypot: invisible para personas, los bots lo completan */}
      <p className="sr-only" aria-hidden="true">
        <label>
          {t.honeypot}
          <input name="bot-field" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId('nombre')} className="mb-1.5 block text-[13.5px] font-semibold">
            {t.name}
          </label>
          <input type="text" autoComplete="name" value={values.nombre} onChange={set('nombre')} className={inputCls('nombre')} {...a11y('nombre')} />
          <ErrorMsg f="nombre" />
        </div>
        <div>
          <label htmlFor={fieldId('email')} className="mb-1.5 block text-[13.5px] font-semibold">
            {t.email}
          </label>
          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={set('email')}
            className={inputCls('email')}
            {...a11y('email')}
          />
          <ErrorMsg f="email" />
        </div>
      </div>

      <div>
        <label htmlFor={fieldId('tipo')} className="mb-1.5 block text-[13.5px] font-semibold">
          {t.type}
        </label>
        <select value={values.tipo} onChange={set('tipo')} className={`${inputCls('tipo')} cursor-pointer`} {...a11y('tipo')}>
          <option value="" disabled>
            {t.typePlaceholder}
          </option>
          {contact.inquiryTypes.map((i) => (
            <option key={i.id} value={i.label}>
              {i.label}
            </option>
          ))}
        </select>
        <ErrorMsg f="tipo" />
      </div>

      <div>
        <label htmlFor={fieldId('mensaje')} className="mb-1.5 block text-[13.5px] font-semibold">
          {t.message}
        </label>
        <textarea
          rows={5}
          value={values.mensaje}
          onChange={set('mensaje')}
          placeholder={t.messagePlaceholder}
          className={`${inputCls('mensaje')} resize-y`}
          {...a11y('mensaje')}
        />
        <ErrorMsg f="mensaje" />
      </div>

      {status === 'error' && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-[10px] border border-err/50 bg-surface-2 p-3.5 text-[14px] outline-none">
          <p className="m-0 font-bold text-err">{t.errorTitle}</p>
          <p className="m-0 mt-1">
            {t.errorText}{' '}
            <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="font-bold text-accent underline">
              {t.errorCta}
            </a>
          </p>
        </div>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn btn-pri self-start">
        {status === 'sending' ? t.sending : t.submit}
      </button>
    </form>
  )
}
