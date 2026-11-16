import type { EducationItem, ExperienceItem } from './types'

export const experience: ExperienceItem[] = [
  {
    role: 'Desarrollador Full Stack',
    organization: 'Profesional independiente',
    period: 'feb. 2025 – actualidad',
    location: 'Remoto',
    current: true,
    highlights: [],
  },
  {
    role: 'Supervisor de Sistemas en Producción',
    organization: 'Núcleo S.A. (Personal Paraguay)',
    period: 'dic. 2024 – actualidad',
    location: 'Asunción',
    current: true,
    highlights: [
      'Monitoreo de disponibilidad y rendimiento con Nagios y Grafana',
      'Respuesta y escalamiento de incidentes',
      'Operación de servidores Linux',
      'Documentación de procesos con AWX, Ansible e InvGate',
    ],
  },
  {
    role: 'Soporte técnico',
    organization: 'Avanza Paraguay S.A.',
    period: 'sep. – dic. 2024',
    location: 'Asunción',
    current: false,
    highlights: ['Soporte de primera línea para fibra óptica y TV satelital'],
  },
]

export const education: EducationItem[] = [
  {
    degree: 'Licenciatura en Ciencias Informáticas',
    institution: 'Facultad Politécnica, UNA',
    status: 'En curso',
  },
]
