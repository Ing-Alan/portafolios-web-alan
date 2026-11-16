import { site } from '@/data/site'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { Hero } from '@/sections/Hero'
import { Projects } from '@/sections/Projects'
import { About } from '@/sections/About'
import { Stack } from '@/sections/Stack'
import { Experience } from '@/sections/Experience'
import { Certifications } from '@/sections/Certifications'
import { Social } from '@/sections/Social'
import { Contact } from '@/sections/Contact'

export function Home() {
  useDocumentMeta(site.meta.title, site.meta.description)
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Stack />
      <Experience />
      <Certifications />
      <Social />
      <Contact />
    </>
  )
}
