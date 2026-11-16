import { useCallback, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProject, getSiblings } from '@/data/projects'
import { projectPage as t } from '@/data/sections'
import { profile } from '@/data/profile'
import type { Project } from '@/data/types'
import { StatusBadge } from '@/components/StatusBadge'
import { AnnotatedShot } from '@/components/AnnotatedShot'
import { Lightbox } from '@/components/Lightbox'
import { Reveal } from '@/components/Reveal'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { NotFound } from './NotFound'

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section>
        <h2 className="m-0 text-[1.3rem] font-bold tracking-[-0.015em]">{title}</h2>
        <div className="mt-3">{children}</div>
      </section>
    </Reveal>
  )
}

function SideCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="panel">
      <h2 className="panel-head m-0 text-xs">
        <b>{title}</b>
      </h2>
      <div className="p-4">{children}</div>
    </div>
  )
}

function ProjectDetail({ project }: { project: Project }) {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const siblings = getSiblings(project.slug)
  useDocumentMeta(`${project.name} · ${profile.name}`, project.summary)

  return (
    <article>
      {/* Encabezado tipo ficha técnica */}
      <header className="blueprint border-b border-rule">
        <div className="container-x py-[clamp(28px,5vw,64px)]">
          <Link
            to={{ pathname: '/', hash: '#proyectos' }}
            className="rounded text-[13.5px] font-semibold text-muted no-underline hover:text-ink"
          >
            {t.back}
          </Link>
          <div className="mt-7">
            <StatusBadge status={project.status} tags={project.tags} />
          </div>
          <h1 className="m-0 mt-3.5 max-w-[22ch] text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.04] tracking-[-0.035em]">
            {project.name}
          </h1>
          <p className="m-0 mt-3 max-w-[56ch] text-[1.05rem] text-muted">{project.summary}</p>
          <dl className="m-0 mt-7 grid max-w-[620px] grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 border-y border-line py-3 font-mono text-[12.5px]">
            <dt className="text-muted">{t.clientLabel}</dt>
            <dd className="m-0 font-bold">{project.clientType}</dd>
            <dt className="text-muted">{t.statusLabel}</dt>
            <dd className="m-0 font-bold">{project.status}</dd>
          </dl>
        </div>
      </header>

      {/* Contenido */}
      <div className="container-x grid gap-x-12 gap-y-10 py-[clamp(40px,6vw,72px)] lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex min-w-0 flex-col gap-10">
          <Block title={t.problem}>
            <p className="m-0 max-w-[65ch] text-[1.02rem]">{project.problem}</p>
          </Block>
          <Block title={t.solution}>
            <p className="m-0 max-w-[65ch] text-[1.02rem]">{project.solution}</p>
          </Block>
          <Block title={t.features}>
            <ul className="m-0 grid list-none gap-2.5 p-0 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-[14.5px]">
                  <span aria-hidden="true" className="mt-[7px] size-1.5 flex-none rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </Block>
          <Block title={t.techDecisions}>
            <ul className="m-0 grid list-none gap-2.5 p-0">
              {project.techDecisions.map((d) => (
                <li key={d} className="flex gap-2.5 font-mono text-[13px] leading-relaxed">
                  <span aria-hidden="true" className="font-bold text-ok">
                    ✓
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </Block>
        </div>

        <aside className="flex flex-col gap-5 self-start lg:sticky lg:top-24">
          <SideCard title={t.stackPanel}>
            <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
              {project.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </SideCard>
          <SideCard title={t.rolePanel}>
            <p className="m-0 text-[14.5px]">{project.role}</p>
          </SideCard>
          <p className="m-0 flex gap-2.5 rounded-[10px] border border-dashed border-rule p-3.5 text-[13px] text-muted">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="mt-0.5 flex-none" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="7" width="10" height="7" rx="1.5" />
              <path d="M5.5 7V5a2.5 2.5 0 015 0v2" />
            </svg>
            {project.confidentiality}
          </p>
        </aside>
      </div>

      {/* Galería */}
      <section aria-labelledby="galeria-title" className="border-t border-rule bg-hero py-[clamp(40px,6vw,80px)]">
        <div className="container-x">
          <Reveal>
            <h2 id="galeria-title" className="m-0 text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.02em]">
              {t.gallery}
            </h2>
            <p className="m-0 mt-2 text-muted">{t.galleryIntro}</p>
          </Reveal>
          <div className="mt-8 flex flex-col gap-[clamp(40px,6vw,72px)]">
            {project.images.map((img, i) => (
              <AnnotatedShot
                key={img.file}
                image={img}
                urlLabel={`${project.slug}/${img.file}`}
                zoomLabel={t.zoom}
                annotationsLabel={t.annotationsLabel}
                onOpen={() => setOpen(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cierre: CTA y navegación entre proyectos */}
      <section className="border-t border-rule">
        <div className="container-x py-[clamp(40px,6vw,72px)]">
          <div className="panel flex flex-col items-start gap-4 p-[clamp(20px,4vw,36px)] sm:flex-row sm:items-center">
            <p className="m-0 font-display text-[1.25rem] font-bold tracking-[-0.015em]">{t.ctaIntro}</p>
            <Link
              to={{ pathname: '/', search: '?tipo=proyecto', hash: '#contacto' }}
              className="btn btn-pri sm:ml-auto"
            >
              {t.cta}
            </Link>
          </div>

          {siblings && (
            <nav aria-label={t.siblingsLabel}className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link
                to={`/proyectos/${siblings.prev.slug}`}
                className="rounded-[12px] border border-rule bg-surface p-4 no-underline transition-colors hover:border-line"
              >
                <span className="block font-mono text-xs text-muted">{t.prev}</span>
                <span className="mt-1 block font-display font-bold text-ink">{siblings.prev.name}</span>
              </Link>
              <Link
                to={`/proyectos/${siblings.next.slug}`}
                className="rounded-[12px] border border-rule bg-surface p-4 text-right no-underline transition-colors hover:border-line"
              >
                <span className="block font-mono text-xs text-muted">{t.next}</span>
                <span className="mt-1 block font-display font-bold text-ink">{siblings.next.name}</span>
              </Link>
            </nav>
          )}
        </div>
      </section>

      <Lightbox images={project.images} index={open} onChange={setOpen} onClose={close} labels={t.lightbox} />
    </article>
  )
}

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined
  if (!project) return <NotFound />
  // key: al pasar de un proyecto a otro se reinicia el estado (lightbox, animaciones)
  return <ProjectDetail key={project.slug} project={project} />
}
