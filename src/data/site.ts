import type { SiteContent } from './types'

/** Dominio público, sin barra final. Si cambia, actualizar también index.html, public/robots.txt y public/sitemap.xml. */
export const SITE_URL = 'https://alanalvarenga.dev'

/** Textos de la estructura del sitio: navegación, footer, tema, metadatos y páginas de sistema. */
export const site: SiteContent = {
  meta: {
    title: 'Alan Alvarenga · Desarrollador Full Stack',
    description:
      'Portafolio de Alan Alvarenga, desarrollador full stack y supervisor de sistemas en producción en Areguá, Paraguay. Sistemas de gestión web seguros, de la base de datos al despliegue.',
  },
  skipLink: 'Saltar al contenido',
  logo: { name: 'alan', tld: 'dev', label: 'alan.dev — ir al inicio' },
  nav: {
    ariaLabel: 'Navegación principal',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    links: [
      { id: 'proyectos', label: 'Proyectos' },
      { id: 'sobre-mi', label: 'Sobre mí' },
      { id: 'stack', label: 'Stack' },
      { id: 'contacto', label: 'Contacto' },
    ],
  },
  theme: {
    groupLabel: 'Tema de color',
    options: [
      { value: 'system', label: 'Sistema' },
      { value: 'light', label: 'Claro' },
      { value: 'dark', label: 'Oscuro' },
    ],
  },
  footer: {
    madeWith: 'Hecho con React, TypeScript y Tailwind · Areguá, Paraguay',
    linksLabel: 'Enlaces del footer',
    repoLabel: 'Código del portafolio',
    repoUrl: 'https://github.com/Ing-Alan/portafolios-web-alan',
    newTab: '(se abre en una pestaña nueva)',
    backToTop: 'Volver arriba ↑',
  },
  notFound: {
    panelTitle: 'terminal',
    panelSubtitle: 'alan.dev',
    title: 'Esta página no existe',
    command: 'cd ',
    error: 'error 404 · página no encontrada',
    text: 'Puede que el enlace esté mal escrito o que la página se haya movido. Mirá los proyectos desde el inicio.',
    cta: 'Volver al inicio',
  },
}
