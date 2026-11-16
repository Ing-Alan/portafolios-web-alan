import type { ReactNode } from 'react'
import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { CopyButton } from '@/components/CopyButton'
import { ContactForm } from '@/components/ContactForm'
import { contact } from '@/data/contact'
import { contactSection as t } from '@/data/sections'

function Channel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <li className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-dashed border-rule py-3.5 last:border-b-0">
      <span className="w-[86px] flex-none font-mono text-xs font-medium text-muted">{label}</span>
      {children}
    </li>
  )
}

const extLink = 'rounded font-semibold text-ink underline decoration-rule underline-offset-4 hover:decoration-accent'

export function Contact() {
  return (
    <Section id={t.id} eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <div className="grid items-start gap-[clamp(28px,4vw,56px)] lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <a
            href={contact.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-pri w-full justify-between sm:w-auto"
          >
            <span>{t.whatsappLabel}</span>
            <span className="font-mono text-[13px]">{contact.whatsapp.display}</span>
            <span className="sr-only"> {t.newTab}</span>
          </a>

          <ul aria-label={t.channelsLabel} className="panel m-0 mt-5 list-none px-4 py-1">
            <Channel label={t.emailLabel.toLowerCase()}>
              <a href={contact.email.href} className={`${extLink} min-w-0 select-all break-all`}>
                {contact.email.address}
              </a>
              <span className="ml-auto">
                <CopyButton
                  text={contact.email.address}
                  labels={{ copy: t.copy, copied: t.copied, failed: t.copyFailed }}
                  srContext={t.emailLabel}
                />
              </span>
            </Channel>
            <Channel label={t.linkedinLabel.toLowerCase()}>
              <a href={contact.linkedin.href} target="_blank" rel="noopener noreferrer" className={extLink}>
                {contact.linkedin.label} ↗<span className="sr-only"> {t.newTab}</span>
              </a>
            </Channel>
            <Channel label={t.githubLabel.toLowerCase()}>
              <a href={contact.github.href} target="_blank" rel="noopener noreferrer" className={extLink}>
                {contact.github.label} ↗<span className="sr-only"> {t.newTab}</span>
              </a>
            </Channel>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  )
}
