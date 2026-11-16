import { Hero } from '@/sections/Hero'
import { Projects } from '@/sections/Projects'
import { About } from '@/sections/About'
import { Stack } from '@/sections/Stack'
import { Experience } from '@/sections/Experience'
import { Certifications } from '@/sections/Certifications'

export function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Stack />
      <Experience />
      <Certifications />
      {/* Provisorio: la sección de contacto real llega en la próxima etapa */}
      <section id="contacto" aria-label="Contacto" className="container-x py-24" />
    </>
  )
}
