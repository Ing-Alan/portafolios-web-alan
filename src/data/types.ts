/* Tipos de todo el contenido del sitio. Los componentes solo leen estos datos. */

import type { ThemeChoice } from '@/hooks/useTheme'

/* ---------- Sitio (navegación, footer, páginas de sistema) ---------- */

export interface NavLink {
  /** id de la sección en Home (se usa como ancla: /#id) */
  id: string
  label: string
}

export interface SiteContent {
  meta: { title: string; description: string }
  skipLink: string
  logo: { name: string; tld: string; label: string }
  nav: { ariaLabel: string; menuOpen: string; menuClose: string; links: NavLink[] }
  theme: { groupLabel: string; options: { value: ThemeChoice; label: string }[] }
  footer: {
    madeWith: string
    linksLabel: string
    newTab: string
    backToTop: string
  }
  notFound: {
    panelTitle: string
    panelSubtitle: string
    title: string
    command: string
    error: string
    text: string
    cta: string
  }
}

/* ---------- Perfil ---------- */

export interface HeroPanelRow {
  /** clave estilo variable, en mono: "sistemas_en_produccion" */
  key: string
  value: string | number
  kind: 'pill' | 'count' | 'mono'
}

export interface Profile {
  name: string
  fullName: string
  role: string
  location: string
  lede: string
  availability: string
  heroPanel: {
    title: string
    subtitle: string
    liveLabel: string
    rows: HeroPanelRow[]
    terminal: { command: string; result: string }
  }
  about: string[]
  workStyle: string[]
}

/* ---------- Proyectos ---------- */

export type ProjectStatus = 'En producción' | 'En implementación'

export interface Annotation {
  text: string
  /** Punto señalado: posición horizontal en % sobre la imagen (0–100) */
  x: number
  /** Punto señalado: posición vertical en % sobre la imagen (0–100) */
  y: number
  /** Centro de la etiqueta en % (escritorio). Si falta, se calcula a partir del punto. */
  lx?: number
  ly?: number
}

export interface ProjectImage {
  /** URL procesada por Vite (.webp, ancho completo) */
  src: string
  /** Variante chica (.webp de 800px) para srcset */
  srcSmall: string
  smallWidth: number
  /** Nombre del archivo, sin extensión */
  file: string
  width: number
  height: number
  title: string
  alt: string
  annotations: Annotation[]
  /** La captura ya incluye su propia barra de navegador: no se dibuja otra encima */
  hasChrome?: boolean
}

export interface Project {
  slug: string
  name: string
  clientType: string
  status: ProjectStatus
  tags: string[]
  summary: string
  problem: string
  solution: string
  features: string[]
  techDecisions: string[]
  stack: string[]
  /** 3 o 4 tecnologías principales para la tarjeta */
  keyStack: string[]
  role: string
  confidentiality: string
  images: ProjectImage[]
}

/* ---------- Experiencia ---------- */

export interface ExperienceItem {
  role: string
  organization: string
  period: string
  location: string
  current: boolean
  highlights: string[]
}

export interface EducationItem {
  degree: string
  institution: string
  status: string
}

/* ---------- Stack ---------- */

export interface StackGroup {
  title: string
  items: string[]
}

/* ---------- Certificaciones ---------- */

export const URL_PENDIENTE = 'URL_PENDIENTE'

export interface Certification {
  name: string
  issuer: string
  date: string
  /** URL de verificación, o URL_PENDIENTE si todavía no se cargó */
  url: string
}

/* ---------- Compromiso social ---------- */

export interface SocialCommitment {
  title: string
  text: string
  modality: string
  example: { label: string; projectSlug: string }
  cta: string
}

/* ---------- Contacto ---------- */

export interface InquiryType {
  /** Valor corto para la URL (?tipo=social) */
  id: string
  /** Texto visible y valor que se envía en el formulario */
  label: string
}

export interface ContactInfo {
  whatsapp: { display: string; number: string; message: string; href: string }
  email: { address: string; href: string }
  linkedin: { label: string; href: string }
  github: { label: string; href: string }
  inquiryTypes: InquiryType[]
  /** Nombre del formulario en Netlify Forms (debe coincidir con el formulario oculto de index.html) */
  formName: string
}
