import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { profile } from '@/data/profile'
import { aboutSection as t } from '@/data/sections'

export function About() {
  return (
    <Section id={t.id} eyebrow={t.eyebrow} title={t.title} tone="hero">
      {/* Biografía: bloque destacado arriba de los párrafos profesionales */}
      <Reveal>
        <div className="mb-[clamp(28px,4vw,44px)] flex flex-col gap-[clamp(18px,3vw,32px)] sm:flex-row sm:items-center">
          <img
            src={profile.photo.srcSmall}
            srcSet={`${profile.photo.srcSmall} 320w, ${profile.photo.src} 640w`}
            sizes="(min-width: 640px) 168px, 136px"
            width={profile.photo.width}
            height={profile.photo.height}
            loading="lazy"
            decoding="async"
            alt={profile.photo.alt}
            className="h-auto w-[136px] flex-none rounded-[14px] border border-rule bg-surface-2 object-cover shadow-[0_20px_40px_-30px_rgba(5,20,45,.5)] sm:w-[168px]"
          />
          <p
            className="m-0 max-w-[68ch] border-l-2 border-accent pl-[clamp(16px,2.5vw,24px)] font-display text-[clamp(1.08rem,1.9vw,1.3rem)] font-medium leading-[1.55] tracking-[-0.01em]"
          >
            {profile.bio}
          </p>
        </div>
      </Reveal>

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
