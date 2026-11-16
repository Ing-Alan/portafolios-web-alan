import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { education, experience } from '@/data/experience'
import { experienceSection as t } from '@/data/sections'

export function Experience() {
  return (
    <Section id={t.id} eyebrow={t.eyebrow} title={t.title} tone="hero">
      <ol className="relative m-0 max-w-[820px] list-none p-0 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-rule">
        {experience.map((item, i) => (
          <Reveal as="li" key={`${item.role}-${item.organization}`} delay={i * 0.06} className="relative pb-9 pl-9 last:pb-0">
            {/* Marcador de la línea de tiempo */}
            <span
              aria-hidden="true"
              className={`absolute left-0 top-[5px] grid size-[15px] place-items-center rounded-full border-2 bg-hero ${
                item.current ? 'border-ok' : 'border-rule'
              }`}
            >
              {item.current && <span className="dot dot-static size-[5px]" />}
            </span>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="m-0 text-[1.12rem] font-bold tracking-[-0.01em]">{item.role}</h3>
              {item.current && (
                <span className="pill">
                  <span className="dot" aria-hidden="true" />
                  {t.active}
                </span>
              )}
            </div>
            <p className="m-0 mt-1 font-semibold">{item.organization}</p>
            <p className="m-0 mt-1 font-mono text-[12.5px] text-muted">
              {item.period} · {item.location}
            </p>
            {item.highlights.length > 0 && (
              <ul className="m-0 mt-3 grid list-none gap-1.5 p-0">
                {item.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-[14.5px]">
                    <span aria-hidden="true" className="mt-[9px] h-px w-3 flex-none bg-line" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}

        {education.map((ed) => (
          <Reveal as="li" key={ed.degree} className="relative pl-9 pt-9">
            <span
              aria-hidden="true"
              className="absolute left-0 top-[41px] size-[15px] rotate-45 rounded-[3px] border-2 border-accent bg-hero"
            />
            <span className="pill pill-neutral">{t.education}</span>
            <h3 className="m-0 mt-2 text-[1.12rem] font-bold tracking-[-0.01em]">{ed.degree}</h3>
            <p className="m-0 mt-1 font-semibold">{ed.institution}</p>
            <p className="m-0 mt-1 font-mono text-[12.5px] text-muted">{ed.status}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
