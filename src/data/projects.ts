import type { Project } from './types'

// --- Sistema odontológico ---
import odo01 from '@/assets/projects/sistema-odontologico/01-agenda.webp'
import odo02 from '@/assets/projects/sistema-odontologico/02-ficha-paciente-odontograma.webp'
import odo03 from '@/assets/projects/sistema-odontologico/03-presupuesto.webp'
// --- Sistema parroquial ---
import par01 from '@/assets/projects/sistema-parroquial/01-acceso.webp'
import par02 from '@/assets/projects/sistema-parroquial/02-dashboard-administrador.webp'
import par03 from '@/assets/projects/sistema-parroquial/03-feligreses.webp'
import par04 from '@/assets/projects/sistema-parroquial/04-inscripcion-catequesis.webp'
import par05 from '@/assets/projects/sistema-parroquial/05-asistencia.webp'
// --- Vacaciones y permisos ---
import vac01 from '@/assets/projects/vacaciones-y-permisos/01-acceso.webp'
import vac02 from '@/assets/projects/vacaciones-y-permisos/02-panel-solicitante.webp'
import vac03 from '@/assets/projects/vacaciones-y-permisos/03-nueva-solicitud.webp'
import vac04 from '@/assets/projects/vacaciones-y-permisos/04-bandeja-jefe.webp'
import vac05 from '@/assets/projects/vacaciones-y-permisos/05-revision-rrhh.webp'
import vac06 from '@/assets/projects/vacaciones-y-permisos/06-configuracion.webp'

const CONFIDENTIALITY =
  'Sistema de uso interno. El código es privado por confidencialidad del cliente. Las capturas usan datos de prueba.'

/*
  Anotaciones: x / y en % sobre la imagen (0 = izquierda/arriba, 100 = derecha/abajo).
  Son posiciones iniciales; ajustarlas mirando el resultado en la página del proyecto.
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
    role: 'Análisis, arquitectura, seguridad y despliegue.',
    confidentiality: CONFIDENTIALITY,
    images: [
      {
        src: odo01,
        file: '01-agenda',
        width: 1600,
        height: 771,
        title: 'Agenda diaria',
        alt: 'Agenda de un día con turnos de 08:00 a 12:00; cada turno muestra paciente, motivo y estado (atendida, en sala de espera, confirmada, ausente) y al final hay un turno libre.',
        annotations: [
          { text: 'Estados del turno: confirmada, en espera, atendida, ausente', x: 26, y: 42 },
          { text: 'Turnos libres a un clic', x: 73, y: 86 },
        ],
      },
      {
        src: odo02,
        file: '02-ficha-paciente-odontograma',
        width: 1600,
        height: 710,
        title: 'Ficha y odontograma',
        alt: 'Ficha de una paciente con datos personales, etiquetas de alerta por alergia y anticoagulación, pestañas de odontograma, evolución, presupuestos y cuenta, y un odontograma de 32 piezas con hallazgos marcados por color.',
        annotations: [
          { text: 'Odontograma en notación FDI', x: 59, y: 70 },
          { text: 'Alertas clínicas visibles', x: 82, y: 25 },
          { text: 'Evolución, presupuestos y cuenta en pestañas', x: 40, y: 41 },
        ],
      },
      {
        src: odo03,
        file: '03-presupuesto',
        width: 1600,
        height: 821,
        title: 'Presupuesto',
        alt: 'Presupuesto aprobado con cuatro prestaciones, pieza dental, cantidad y precios en guaraníes, subtotal, descuento, total y un plan de pago en tres cuotas con sus vencimientos.',
        annotations: [
          { text: 'Montos en guaraníes sin decimales', x: 88, y: 79 },
          { text: 'Plan de pago en cuotas con vencimientos', x: 40, y: 88 },
        ],
      },
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
    role: 'Lideré y doné el proyecto, desarrollado junto a un equipo de voluntarios.',
    confidentiality: CONFIDENTIALITY,
    images: [
      {
        src: par01,
        file: '01-acceso',
        width: 1200,
        height: 750,
        title: 'Acceso por rol',
        alt: 'Pantalla de ingreso del sistema parroquial con campos de correo electrónico y contraseña y el botón para ingresar.',
        annotations: [{ text: 'Cada usuario entra directo a su área', x: 50, y: 68 }],
      },
      {
        src: par02,
        file: '02-dashboard-administrador',
        width: 1200,
        height: 750,
        title: 'Panel del administrador',
        alt: 'Panel del administrador con indicadores de feligreses, capillas, inscriptos en catequesis y pagos pendientes, tarjetas con el resumen de cada capilla y una tabla de últimas inscripciones.',
        annotations: [
          { text: 'Resumen por capilla', x: 58, y: 38 },
          { text: 'Indicadores globales', x: 50, y: 17 },
        ],
      },
      {
        src: par03,
        file: '03-feligreses',
        width: 1200,
        height: 750,
        title: 'Feligreses',
        alt: 'Listado de feligreses de una capilla con buscador, filtros por sacramento y estado, y etiquetas de color para bautismo, primera comunión y confirmación.',
        annotations: [
          { text: 'Sacramentos con etiquetas de color', x: 60, y: 41 },
          { text: 'Búsqueda y filtros', x: 45, y: 15 },
        ],
      },
      {
        src: par04,
        file: '04-inscripcion-catequesis',
        width: 1200,
        height: 750,
        title: 'Inscripción',
        alt: 'Formulario de inscripción a catequesis con los datos del feligrés completados automáticamente y la selección de capilla, nivel y grupo, que muestra los cupos ocupados.',
        annotations: [
          { text: 'Autocompletado del feligrés', x: 29, y: 22 },
          { text: 'Control de cupos por grupo', x: 78, y: 39 },
        ],
      },
      {
        src: par05,
        file: '05-asistencia',
        width: 1200,
        height: 750,
        title: 'Asistencia',
        alt: 'Registro de asistencia de un grupo de catequesis con botones de presente y ausente junto a cada alumno y un resumen con la asistencia del día y el promedio del grupo.',
        annotations: [
          { text: 'Presente o ausente con un clic', x: 88, y: 45 },
          { text: 'Resumen de asistencia del grupo', x: 50, y: 94 },
        ],
      },
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
    role: 'Dirección técnica, arquitectura y revisión de código, con desarrollo asistido por IA.',
    confidentiality: CONFIDENTIALITY,
    images: [
      {
        src: vac01,
        file: '01-acceso',
        width: 1600,
        height: 659,
        title: 'Ingreso',
        alt: 'Pantalla de inicio de sesión del sistema de vacaciones y permisos, con campo de correo institucional y contraseña.',
        annotations: [{ text: 'Acceso con correo institucional', x: 75, y: 48 }],
      },
      {
        src: vac02,
        file: '02-panel-solicitante',
        width: 1600,
        height: 955,
        title: 'Panel del solicitante',
        alt: 'Panel del solicitante con un calendario mensual que distingue días hábiles y no laborables, una tabla de períodos con días otorgados y disponibles, y la lista de sus solicitudes con su estado.',
        annotations: [
          { text: 'Calendario con días no laborables', x: 42, y: 58 },
          { text: 'Saldos por período', x: 81, y: 40 },
        ],
      },
      {
        src: vac03,
        file: '03-nueva-solicitud',
        width: 1600,
        height: 1005,
        title: 'Nueva solicitud',
        alt: 'Formulario de nueva solicitud con tipo, opción de medio día, fechas desde y hasta, jefe inmediato, reemplazo y adjunto de certificado; al pie indica cuántos días hábiles se van a descontar.',
        annotations: [
          { text: 'Cálculo automático de días hábiles', x: 36, y: 92 },
          { text: 'Adjunto en almacenamiento privado', x: 57, y: 72 },
        ],
      },
      {
        src: vac04,
        file: '04-bandeja-jefe',
        width: 1600,
        height: 909,
        title: 'Bandeja del jefe',
        alt: 'Bandeja del jefe inmediato con las solicitudes pendientes de su equipo y botones para autorizar o rechazar, sus últimas autorizaciones y las próximas ausencias del equipo.',
        annotations: [{ text: 'Cada jefe ve solo a su equipo (RLS)', x: 60, y: 45 }],
      },
      {
        src: vac05,
        file: '05-revision-rrhh',
        width: 1600,
        height: 801,
        title: 'Revisión de RRHH',
        alt: 'Detalle de una solicitud aprobada por el jefe y pendiente de RRHH, con los días a descontar, el período afectado y una línea de tiempo con cada paso de la aprobación.',
        annotations: [
          { text: 'Línea de tiempo de aprobaciones', x: 86, y: 66 },
          { text: 'Cada acción queda en la auditoría', x: 43, y: 72 },
        ],
      },
      {
        src: vac06,
        file: '06-configuracion',
        width: 1600,
        height: 1320,
        title: 'Configuración',
        alt: 'Configuración de RRHH con la tabla de tipos de solicitud, si descuentan vacaciones y si requieren adjunto, un formulario para crear un tipo nuevo, la tabla de días por antigüedad y los días no laborables.',
        annotations: [
          { text: 'Tipos de solicitud configurables', x: 40, y: 42 },
          { text: 'Permisos limitados para RRHH-Carga', x: 78, y: 9 },
        ],
      },
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
