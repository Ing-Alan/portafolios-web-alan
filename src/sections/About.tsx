import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { profile } from '@/data/profile'
import { aboutSection as t } from '@/data/sections'

export function About() {
  return (
    <Section id={t.id} eyebrow={t.eyebrow} title={t.title} tone="hero">
      <div className="grid items-start gap-[clamp(28px,4vw,56px)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,.9fr)]">
        <div className="flex flex-col gap-4">
          {profile.about.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className={`m-0 max-w-[64ch] ${i === 0 ? 'text-[1.08rem] font-medium' : 'text-[1rem]'}`}>{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="panel">
            <div className="panel-head">
              <b>{t.workStyleTitle}</b> · {t.workStyleSubtitle}
              <span className="ml-auto font-bold text-ok">
                {profile.workStyle.length}/{profile.workStyle.length}
              </span>
            </div>
            <ul className="m-0 list-none px-4 py-2">
              {profile.workStyle.map((w) => (
                <li
                  key={w}
                  className="flex items-start gap-3 border-b border-dashed border-rule py-3 font-mono text-[13px] font-medium last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-[18px] flex-none place-items-center rounded-[5px] bg-ok-bg text-[11px] font-bold text-ok"
                  >
                    ✓
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
