import type { Profile } from './types'

export const profile: Profile = {
  name: 'Alan Alvarenga',
  fullName: 'Alan Gustavo Alvarenga Ojeda',
  role: 'Desarrollador Full Stack · Supervisor de Sistemas en Producción',
  location: 'Areguá, Paraguay',
  lede: 'Construyo sistemas de gestión web seguros, de la base de datos al despliegue, y sé lo que pasa con ellos cuando ya están en producción.',
  availability: 'Disponible para proyectos',

  heroPanel: {
    title: 'estado',
    subtitle: 'panel en vivo',
    liveLabel: 'online',
    rows: [
      { key: 'disponibilidad', value: 'Disponible para proyectos', kind: 'pill' },
      { key: 'sistemas_en_produccion', value: 2, kind: 'count' },
      { key: 'en_implementacion', value: 1, kind: 'count' },
      { key: 'stack', value: 'React · TS · PostgreSQL', kind: 'mono' },
    ],
    terminal: {
      command: 'npm run deploy',
      result: '✓ Desplegado en Netlify · RLS activo · Ley 7593/2025',
    },
  },

  bio: 'Soy Alan, de Areguá, Paraguay. Aprendo en dos frentes a la vez: en la Facultad Politécnica de la UNA, donde estudio Ciencias Informáticas, y en la operación diaria de sistemas en producción de una empresa de telecomunicaciones. Desde 2025 también desarrollo soluciones web a medida. Cuando un proyecto tiene un fin social, busco la forma de que el presupuesto no sea un obstáculo.',

  about: [
    'Desarrollo sistemas de gestión web a medida para organizaciones y empresas que necesitan dejar atrás el papel y las planillas dispersas. Me encargo del proyecto completo: entiendo la necesidad, diseño la base de datos y la solución, la construyo y la dejo funcionando en la nube.',
    'Trabajo con desarrollo asistido por IA, con la arquitectura, la seguridad y la revisión de código a mi cargo. Defino el modelo de datos, las reglas de seguridad y las fases del proyecto, reviso cada cambio y exijo tests antes de dar algo por terminado.',
    'Además, superviso sistemas en producción en una empresa de telecomunicaciones. Esa experiencia me hace pensar en lo que pasa después del despliegue: monitoreo, estabilidad y continuidad del servicio.',
    'Estudio la Licenciatura en Ciencias Informáticas en la Facultad Politécnica de la UNA.',
  ],

  workStyle: [
    'Análisis antes de construir',
    'Seguridad desde el diseño',
    'Entregas por fases revisables',
    'Comunicación clara, sin tecnicismos innecesarios',
  ],
}
