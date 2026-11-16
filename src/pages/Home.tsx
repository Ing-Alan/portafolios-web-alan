import { site } from '@/data/site'
import { Hero } from '@/sections/Hero'
import { Projects } from '@/sections/Projects'

export function Home() {
  return (
    <>
      <Hero />
      <Projects />
      {/* Marcadores provisorios: se reemplazan por las secciones reales en las próximas etapas */}
      <div className="container-x">
        {site.nav.links
          .filter((l) => l.id !== 'proyectos')
          .map((l) => (
            <section key={l.id} id={l.id} aria-labelledby={`${l.id}-title`} className="border-b border-dashed border-rule py-24">
              <h2 id={`${l.id}-title`} className="text-2xl font-bold">
                {l.label}
              </h2>
            </section>
          ))}
      </div>
    </>
  )
}
