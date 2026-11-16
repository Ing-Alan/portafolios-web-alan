import type { SiteContent } from './types'

/** Textos de la estructura del sitio: navegación, footer, tema y páginas de sistema. */
export const site: SiteContent = {
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
    note: 'Hecho en Areguá, Paraguay.',
    backToTop: 'Volver arriba ↑',
  },
  notFound: {
    code: '404',
    command: 'cd ',
    error: 'error: ruta no encontrada',
    title: 'Esta página no existe',
    text: 'Puede que el enlace esté mal escrito o que la página se haya movido. Mirá los proyectos desde el inicio.',
    cta: 'Volver al inicio',
  },
  projectPage: {
    back: '← Volver a proyectos',
    notFoundTitle: 'Proyecto no encontrado',
  },
}
