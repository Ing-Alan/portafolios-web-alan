import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { certifications, hasVerificationUrl } from '@/data/certifications'
import { certificationsSection as t } from '@/data/sections'

export function Certifications() {
  return (
    <Section id={t.id} eyebrow={t.eyebrow} title={t.title}>
      <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal as="li" key={c.name} delay={(i % 3) * 0.06} className="min-w-0">
            <article className="panel flex h-full flex-col p-[18px]">
              <p className="m-0 font-mono text-[11.5px] font-semibold uppercase tracking-[0.06em] text-muted">{c.issuer}</p>
              <h3 className="m-0 mt-2 text-[1.02rem] font-bold leading-snug tracking-[-0.01em]">{c.name}</h3>
              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4">
                <span className="font-mono text-[12.5px] text-muted">{c.date}</span>
                {hasVerificationUrl(c) && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto rounded text-[13.5px] font-bold text-accent hover:underline"
                  >
                    {t.verify}
                    <span className="sr-only"> {t.newTab}</span>
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
