import { Link, useParams } from 'react-router-dom'
import { getProject } from '@/data/projects'
import { site } from '@/data/site'
import { NotFound } from './NotFound'

/** Esqueleto: el detalle completo del proyecto se construye en una etapa posterior. */
export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined
  if (!project) return <NotFound />

  return (
    <article className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-10">
      <Link to={{ pathname: '/', hash: '#proyectos' }} className="rounded text-sm font-semibold text-muted hover:text-ink">
        {site.projectPage.back}
      </Link>
      <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-accent">{project.status}</p>
      <h1 className="mt-2 text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-tight tracking-[-0.035em]">
        {project.name}
      </h1>
      <p className="mt-3 max-w-[60ch] text-muted">{project.summary}</p>
    </article>
  )
}
