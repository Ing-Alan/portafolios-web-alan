import { URL_PENDIENTE, type Certification } from './types'

/** Completar `url` con el enlace de verificación de cada certificado. */
export const certifications: Certification[] = [
  {
    name: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy',
    date: 'oct. 2023',
    url: URL_PENDIENTE,
  },
  {
    name: 'Python Essentials 2',
    issuer: 'Cisco Networking Academy',
    date: 'feb. 2025',
    url: URL_PENDIENTE,
  },
  {
    name: 'Curso completo de Hacking Ético y Ciberseguridad',
    issuer: 'Udemy',
    date: 'feb. 2025',
    url: URL_PENDIENTE,
  },
  {
    name: 'Hacking Ético: virus, troyanos, spyware y malware',
    issuer: 'Udemy',
    date: 'nov. 2025',
    url: URL_PENDIENTE,
  },
  {
    name: 'Curso completo de Linux: comandos y Shell Script',
    issuer: 'Udemy',
    date: 'may. 2026',
    url: URL_PENDIENTE,
  },
  {
    name: 'Complete Claude Code Course: Develop Applications with AI',
    issuer: 'Udemy',
    date: 'jul. 2026',
    url: URL_PENDIENTE,
  },
]

export const hasVerificationUrl = (c: Certification): boolean => c.url !== URL_PENDIENTE
