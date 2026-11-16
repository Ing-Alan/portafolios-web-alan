import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { stack } from '@/data/stack'
import { stackSection as t } from '@/data/sections'

export function Stack() {
  return (
    <Section id={t.id} eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <div className="grid gap-5 md:grid-cols-3">
        {stack.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.08} className="min-w-0">
            <section aria-labelledby={`stack-${i}`} className="panel h-full">
              <h3 id={`stack-${i}`} className="panel-head m-0">
                <b>{group.title}</b>
                <span className="ml-auto">{group.items.length}</span>
              </h3>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-4">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
