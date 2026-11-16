import type { Project, ProjectImage } from './types'

/*
  Imágenes: generadas con `npm run images` en src/assets/projects/<slug>/
  (<archivo>.webp a ancho completo + <archivo>-sm.webp de 800px).
*/
const files = import.meta.glob<string>('/src/assets/projects/*/*.webp', { eager: true, import: 'default' })

type ShotData = Omit<ProjectImage, 'src' | 'srcSmall' | 'smallWidth' | 'file' | 'width' | 'height'>

function shot(slug: string, file: string, width: number, height: number, data: ShotData): ProjectImage {
  const src = files[`/src/assets/projects/${slug}/${file}.webp`]
  const srcSmall = files[`/src/assets/projects/${slug}/${file}-sm.webp`]
  if (!src || !srcSmall) throw new Error(`Falta la imagen ${slug}/${file}. Corré "npm run images".`)
  return { src, srcSmall, smallWidth: Math.min(800, width), file, width, height, ...data }
}

const CONFIDENTIALITY =
  'Sistema de uso interno. El código es privado por confidencialidad del cliente. Las capturas usan datos de prueba.'

/*
  Anotaciones (en % sobre la imagen, 0 = izquierda/arriba, 100 = derecha/abajo):
  - x, y   → punto que señala la línea
  - lx, ly → centro de la etiqueta en escritorio (ubicada en zonas vacías de la captura)
  En celular las etiquetas se reemplazan por números sobre la imagen y una lista debajo.
*/

export const projects: Project[] = [
  {
    slug: 'sistema-odontologico',
    name: 'Sistema de gestión odontológica',
    clientType: 'Clínica odontológica privada',
    status: 'En producción',
    tags: [],
    summary: 'Agenda, ficha clínica, odontograma y cobros en un solo sistema.',
    problem:
      'Las historias clínicas, los turnos y los cobros se manejaban en papel y planillas, sin trazabilidad.',
    solution:
      'Un sistema web que reúne la agenda, la ficha clínica con odontograma, los presupuestos y la cuenta corriente de cada paciente, con acceso seguro desde cualquier dispositivo y un registro de cada cambio.',
    features: [
      'Agenda por día y hora con estados del turno',
      'Ficha del paciente con alertas clínicas',
      'Odontograma interactivo en notación FDI',
      'Evolución clínica con auditoría inmutable',
      'Consentimiento informado con firma digital',
      'Presupuestos con plan de pago en cuotas',
      'Cuenta corriente en guaraníes sin decimales',
      'Recordatorios por WhatsApp',
    ],
    techDecisions: [
      'Seguridad a nivel de base de datos (RLS) por clínica',
      'Auditoría con triggers inmutables',
      'Esquema preparado para varios profesionales y sedes',
      'Cumplimiento de la Ley 7593/2025 de Protección de Datos Personales',
    ],
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Supabase (PostgreSQL, Auth, RLS, Edge Functions)',
      'Netlify',
    ],
    keyStack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL'],
    role: 'Análisis, arquitectura, seguridad y despliegue.',
    confidentiality: CONFIDENTIALITY,
    images: [
      shot('sistema-odontologico', '01-agenda', 1600, 771, {
        title: 'Agenda diaria',
        alt: 'Agenda de un día con turnos de 08:00 a 12:00; cada turno muestra paciente, motivo y estado (atendida, en sala de espera, confirmada, ausente) y al final hay un turno libre.',
        annotations: [
          { text: 'Estados del turno: confirmada, en espera, atendida, ausente', x: 24, y: 40, lx: 31, ly: 64 },
          { text: 'Turnos libres a un clic', x: 66, y: 86, lx: 31, ly: 86 },
        ],
      }),
      shot('sistema-odontologico', '02-ficha-paciente-odontograma', 1600, 710, {
        title: 'Ficha y odontograma',
        alt: 'Ficha de una paciente con datos personales, etiquetas de alerta por alergia y anticoagulación, pestañas de odontograma, evolución, presupuestos y cuenta, y un odontograma de 32 piezas con hallazgos marcados por color.',
        annotations: [
          { text: 'Odontograma en notación FDI', x: 72, y: 70, lx: 89, ly: 62 },
          { text: 'Alertas clínicas visibles', x: 81, y: 25, lx: 66, ly: 16 },
          { text: 'Evolución, presupuestos y cuenta en pestañas', x: 35, y: 41, lx: 77, ly: 41 },
        ],
      }),
      shot('sistema-odontologico', '03-presupuesto', 1600, 821, {
        title: 'Presupuesto',
        alt: 'Presupuesto aprobado con cuatro prestaciones, pieza dental, cantidad y precios en guaraníes, subtotal, descuento, total y un plan de pago en tres cuotas con sus vencimientos.',
        annotations: [
          { text: 'Montos en guaraníes sin decimales', x: 92, y: 80, lx: 60, ly: 81 },
          { text: 'Plan de pago en cuotas con vencimientos', x: 30, y: 88, lx: 35, ly: 72 },
        ],
      }),
    ],
  },

  {
    slug: 'sistema-parroquial',
    name: 'Sistema de gestión parroquial',
    clientType: 'Parroquia con varias capillas (organización sin fines de lucro)',
    status: 'En producción',
    tags: ['Donado'],
    summary: 'Feligreses, catequesis, asistencia y pagos para una parroquia con varias capillas.',
    problem:
      'Los registros estaban en papel, los datos se duplicaban entre capillas y no había historial de sacramentos ni reportes consolidados.',
    solution:
      'Un sistema compartido por todas las capillas, donde cada una gestiona sus feligreses, grupos de catequesis, asistencia y pagos, y la parroquia obtiene reportes consolidados sin duplicar datos.',
    features: [
      '4 roles: administrador, encargado de capilla, catequista y secretaría',
      'Feligreses con historial de sacramentos',
      'Grupos de catequesis con control de cupos',
      'Asistencia con un clic',
      'Pagos de aranceles',
      'Constancias en PDF',
      'Reportes por capilla y consolidados',
    ],
    techDecisions: [
      'Cada capilla solo ve sus datos gracias a RLS',
      'Construido solo con capas gratuitas en la nube, sin costo para la organización',
      'Implementación gradual con una capilla piloto',
    ],
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Supabase (PostgreSQL, Auth, RLS)',
      '@react-pdf/renderer',
      'Netlify',
    ],
    keyStack: ['React', 'TypeScript', 'Supabase', 'RLS'],
    role: 'Lideré y doné el proyecto, desarrollado junto a un equipo de voluntarios.',
    confidentiality: CONFIDENTIALITY,
    images: [
      shot('sistema-parroquial', '01-acceso', 1200, 750, {
        title: 'Acceso por rol',
        alt: 'Pantalla de ingreso del sistema parroquial con campos de correo electrónico y contraseña y el botón para ingresar.',
        annotations: [{ text: 'Cada usuario entra directo a su área', x: 60, y: 68, lx: 82, ly: 56 }],
      }),
      shot('sistema-parroquial', '02-dashboard-administrador', 1200, 750, {
        title: 'Panel del administrador',
        alt: 'Panel del administrador con indicadores de feligreses, capillas, inscriptos en catequesis y pagos pendientes, tarjetas con el resumen de cada capilla y una tabla de últimas inscripciones.',
        annotations: [
          { text: 'Resumen por capilla', x: 38, y: 35, lx: 40, ly: 89 },
          { text: 'Indicadores globales', x: 50, y: 17, lx: 56, ly: 5 },
        ],
      }),
      shot('sistema-parroquial', '03-feligreses', 1200, 750, {
        title: 'Feligreses',
        alt: 'Listado de feligreses de una capilla con buscador, filtros por sacramento y estado, y etiquetas de color para bautismo, primera comunión y confirmación.',
        annotations: [
          { text: 'Sacramentos con etiquetas de color', x: 60, y: 45, lx: 72, ly: 80 },
          { text: 'Búsqueda y filtros', x: 40, y: 15, lx: 36, ly: 86 },
        ],
      }),
      shot('sistema-parroquial', '04-inscripcion-catequesis', 1200, 750, {
        title: 'Inscripción',
        alt: 'Formulario de inscripción a catequesis con los datos del feligrés completados automáticamente y la selección de capilla, nivel y grupo, que muestra los cupos ocupados.',
        annotations: [
          { text: 'Autocompletado del feligrés', x: 29, y: 22, lx: 38, ly: 72 },
          { text: 'Control de cupos por grupo', x: 78, y: 39, lx: 78, ly: 66 },
        ],
      }),
      shot('sistema-parroquial', '05-asistencia', 1200, 750, {
        title: 'Asistencia',
        alt: 'Registro de asistencia de un grupo de catequesis con botones de presente y ausente junto a cada alumno y un resumen con la asistencia del día y el promedio del grupo.',
        annotations: [
          { text: 'Presente o ausente con un clic', x: 93, y: 45, lx: 74, ly: 82 },
          { text: 'Resumen de asistencia del grupo', x: 30, y: 95, lx: 36, ly: 82 },
        ],
      }),
    ],
  },

  {
    slug: 'vacaciones-y-permisos',
    name: 'Sistema de vacaciones y permisos',
    clientType: 'Estudio jurídico',
    status: 'En implementación',
    tags: [],
    summary: 'Solicitudes, aprobación en dos pasos y saldos de vacaciones automáticos.',
    problem:
      'Los pedidos de vacaciones y permisos llegaban por mail o en papel, sin control de saldos ni registro de quién aprobó qué.',
    solution:
      'Un circuito digital donde cada colaborador pide sus días, el jefe inmediato y RRHH los aprueban en dos pasos, y el sistema calcula días hábiles y descuenta saldos automáticamente, dejando registro de cada acción.',
    features: [
      '4 roles: solicitante, jefe inmediato, RRHH y RRHH-Carga',
      'Flujo de aprobación en dos pasos',
      'Cálculo automático de días hábiles, excluyendo fines de semana y feriados',
      'Solicitudes de medio día',
      'Saldos por período según antigüedad',
      'Anulaciones que devuelven los días',
      'Adjuntos médicos en almacenamiento privado',
      'Notificaciones por email',
    ],
    techDecisions: [
      'Máquina de estados con historial de transiciones',
      'Descuentos de saldo atómicos',
      'Nadie puede aprobar su propia solicitud',
      'Auditoría inmutable',
      'Validación en cliente y servidor',
      'Tests automatizados (Vitest, React Testing Library, Playwright) y CI con GitHub Actions',
    ],
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'TanStack Query',
      'React Hook Form + Zod',
      'Supabase (PostgreSQL, Auth, Storage, RLS, Edge Functions)',
      'Resend',
      'Netlify',
      'GitHub Actions',
    ],
    keyStack: ['React', 'TypeScript', 'Supabase', 'Playwright'],
    role: 'Dirección técnica, arquitectura y revisión de código, con desarrollo asistido por IA.',
    confidentiality: CONFIDENTIALITY,
    images: [
      shot('vacaciones-y-permisos', '01-acceso', 1600, 659, {
        title: 'Ingreso',
        alt: 'Pantalla de inicio de sesión del sistema de vacaciones y permisos, con campo de correo institucional y contraseña.',
        annotations: [{ text: 'Acceso con correo institucional', x: 70, y: 48, lx: 82, ly: 30 }],
      }),
      shot('vacaciones-y-permisos', '02-panel-solicitante', 1600, 955, {
        title: 'Panel del solicitante',
        alt: 'Panel del solicitante con un calendario mensual que distingue días hábiles y no laborables, una tabla de períodos con días otorgados y disponibles, y la lista de sus solicitudes con su estado.',
        annotations: [
          { text: 'Calendario con días no laborables', x: 34, y: 89, lx: 53, ly: 89 },
          { text: 'Saldos por período', x: 93, y: 37, lx: 81, ly: 55 },
        ],
      }),
      shot('vacaciones-y-permisos', '03-nueva-solicitud', 1600, 1005, {
        title: 'Nueva solicitud',
        alt: 'Formulario de nueva solicitud con tipo, opción de medio día, fechas desde y hasta, jefe inmediato, reemplazo y adjunto de certificado; al pie indica cuántos días hábiles se van a descontar.',
        annotations: [
          { text: 'Cálculo automático de días hábiles', x: 36, y: 92, lx: 12, ly: 82 },
          { text: 'Adjunto en almacenamiento privado', x: 60, y: 72, lx: 88, ly: 64 },
        ],
      }),
      shot('vacaciones-y-permisos', '04-bandeja-jefe', 1600, 909, {
        title: 'Bandeja del jefe',
        alt: 'Bandeja del jefe inmediato con las solicitudes pendientes de su equipo y botones para autorizar o rechazar, sus últimas autorizaciones y las próximas ausencias del equipo.',
        annotations: [{ text: 'Cada jefe ve solo a su equipo (RLS)', x: 45, y: 46, lx: 78, ly: 13 }],
      }),
      shot('vacaciones-y-permisos', '05-revision-rrhh', 1600, 801, {
        title: 'Revisión de RRHH',
        alt: 'Detalle de una solicitud aprobada por el jefe y pendiente de RRHH, con los días a descontar, el período afectado y una línea de tiempo con cada paso de la aprobación.',
        annotations: [
          { text: 'Línea de tiempo de aprobaciones', x: 80, y: 64, lx: 62, ly: 84 },
          { text: 'Cada acción queda en la auditoría', x: 40, y: 72, lx: 32, ly: 84 },
        ],
      }),
      shot('vacaciones-y-permisos', '06-configuracion', 1600, 1320, {
        title: 'Configuración',
        alt: 'Configuración de RRHH con la tabla de tipos de solicitud, si descuentan vacaciones y si requieren adjunto, un formulario para crear un tipo nuevo, la tabla de días por antigüedad y los días no laborables.',
        annotations: [
          { text: 'Tipos de solicitud configurables', x: 32, y: 45, lx: 42, ly: 66 },
          { text: 'Permisos limitados para RRHH-Carga', x: 78, y: 9, lx: 88, ly: 17 },
        ],
      }),
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

/** Proyectos anterior y siguiente (circular). */
export function getSiblings(slug: string): { prev: Project; next: Project } | undefined {
  const i = projects.findIndex((p) => p.slug === slug)
  const n = projects.length
  const prev = projects[(i - 1 + n) % n]
  const next = projects[(i + 1) % n]
  if (i < 0 || !prev || !next) return undefined
  return { prev, next }
}
