import { Link } from 'react-router-dom'
import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { StatusBadge } from '@/components/StatusBadge'
import { projects } from '@/data/projects'
import { projectsSection as t } from '@/data/sections'
import type { Project } from '@/data/types'

function ProjectCard({ project }: { project: Project }) {
  const cover = project.images[0]
  return (
    <Link
      to={`/proyectos/${project.slug}`}
      className="panel group flex h-full flex-col overflow-hidden text-ink no-underline transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line motion-reduce:hover:translate-y-0"
    >
      <div className="panel-head">
        <StatusBadge status={project.status} tags={project.tags} />
      </div>
      {cover && (
        <div className="aspect-[16/10] overflow-hidden border-b border-rule bg-surface-2">
          <img
            src={cover.srcSmall}
            srcSet={`${cover.srcSmall} ${cover.smallWidth}w, ${cover.src} ${cover.width}w`}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            width={cover.width}
            height={cover.height}
            loading="lazy"
            decoding="async"
            alt=""
            className="h-full w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-[18px]">
        <h3 className="m-0 text-[1.15rem] font-bold leading-snug tracking-[-0.01em]">{project.name}</h3>
        <p className="m-0 mt-1.5 text-[14px] text-muted">{project.summary}</p>
        <ul className="m-0 mt-4 flex list-none flex-wrap gap-1.5 p-0" aria-label={t.keyStackLabel}>
          {project.keyStack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
        <span className="mt-auto pt-5 text-[14px] font-bold text-accent">
          <span className="group-hover:underline">{t.cardCta}</span>
        </span>
      </div>
    </Link>
  )
}

export function Projects() {
  return (
    <Section id={t.id} eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 0.08} className="min-w-0">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
