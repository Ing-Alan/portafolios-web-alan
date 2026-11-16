import { Link } from 'react-router-dom'
import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { Nanduti } from '@/components/Nanduti'
import { StatusBadge } from '@/components/StatusBadge'
import { social } from '@/data/social'
import { getProject } from '@/data/projects'
import { socialSection as t } from '@/data/sections'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function Social() {
  const example = getProject(social.example.projectSlug)
  const cover = example?.images[0]
  const mobile = useMediaQuery('(max-width: 820px)')
  // Segundo ñandutí: más grande y tenue, centrado a la derecha
  const nd = mobile
    ? { cx: 0.95, cy: 0.12, radius: 0.6, opacity: 0.1 }
    : { cx: 0.86, cy: 0.5, radius: 0.85, opacity: 0.13 }

  return (
    <Section
      id={t.id}
      eyebrow={t.eyebrow}
      title={social.title}
      tone="hero"
      background={<Nanduti {...nd} spokes={48} rings={8} duration={3200} weaveInView />}
    >
      <div className="grid items-center gap-[clamp(28px,4vw,56px)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]">
        <Reveal>
          <p className="m-0 max-w-[58ch] text-[1.08rem] font-medium">{social.text}</p>
          <p className="m-0 mt-4 max-w-[58ch] text-muted">{social.modality}</p>
          <p className="m-0 mt-7 font-display text-[1.15rem] font-bold tracking-[-0.01em]">{social.cta}</p>
          <Link to={{ pathname: '/', search: '?tipo=social', hash: '#contacto' }} className="btn btn-pri mt-4">
            {t.cta}
          </Link>
        </Reveal>

        {example && (
          <Reveal delay={0.1}>
            <Link
              to={`/proyectos/${example.slug}`}
              className="panel group block overflow-hidden text-ink no-underline transition-colors hover:border-line"
            >
              <div className="panel-head">
                <b>{t.exampleEyebrow.toLowerCase()}</b>
                <span className="ml-auto">
                  <StatusBadge status={example.status} tags={example.tags} />
                </span>
              </div>
              {cover && (
                <div className="aspect-[16/9] overflow-hidden border-b border-rule bg-surface-2">
                  <img
                    src={cover.srcSmall}
                    width={cover.width}
                    height={cover.height}
                    loading="lazy"
                    decoding="async"
                    alt=""
                    className="h-full w-full object-cover object-left-top"
                  />
                </div>
              )}
              <div className="p-[18px]">
                <h3 className="m-0 text-[1.1rem] font-bold tracking-[-0.01em]">{social.example.label}</h3>
                <p className="m-0 mt-1.5 text-[14px] text-muted">{example.summary}</p>
                <span className="mt-4 block text-[14px] font-bold text-accent group-hover:underline">{t.exampleCta}</span>
              </div>
            </Link>
          </Reveal>
        )}
      </div>
    </Section>
  )
}
