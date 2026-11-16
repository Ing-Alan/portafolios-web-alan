import { site } from '@/data/site'

/**
 * Esqueleto de la página principal. Cada sección real vivirá en src/sections/
 * (una por archivo) y reemplazará a estos marcadores en las próximas etapas.
 */
export function Home() {
  return (
    <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-10">
      {site.nav.links.map((l) => (
        <section
          key={l.id}
          id={l.id}
          aria-labelledby={`${l.id}-title`}
          className="border-b border-dashed border-rule py-24"
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-accent">#{l.id}</p>
          <h2 id={`${l.id}-title`} className="mt-2 text-2xl font-bold">
            {l.label}
          </h2>
        </section>
      ))}
    </div>
  )
}
