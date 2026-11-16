/* Textos de interfaz de cada sección (títulos, introducciones, botones y etiquetas). */

export const hero = {
  ctaProjects: 'Ver proyectos →',
  ctaContact: 'Contactar',
  panelLabel: 'Panel de estado de Alan Alvarenga',
  terminalLabel: 'Último despliegue',
}

export const projectsSection = {
  id: 'proyectos',
  eyebrow: '01 · Proyectos',
  title: 'Sistemas funcionando en el mundo real',
  intro:
    'Sistemas de gestión construidos a medida para organizaciones reales. Entrá a cada uno para ver el problema, la solución y las decisiones técnicas detrás.',
  cardCta: 'Ver caso de estudio →',
}

export const projectPage = {
  back: '← Volver a proyectos',
  clientLabel: 'Cliente',
  statusLabel: 'Estado',
  problem: 'Problema',
  solution: 'Solución',
  features: 'Funciones principales',
  techDecisions: 'Decisiones técnicas',
  stack: 'Stack',
  role: 'Mi rol',
  gallery: 'Capturas',
  galleryIntro: 'Recorrido por las pantallas principales. Hacé clic en una captura para verla ampliada.',
  zoom: 'Ampliar captura',
  annotationsLabel: 'Anotaciones',
  prev: '← Proyecto anterior',
  next: 'Proyecto siguiente →',
  cta: 'Contactame por un proyecto así',
  ctaIntro: '¿Necesitás un sistema parecido para tu organización?',
  lightbox: {
    label: 'Captura ampliada',
    close: 'Cerrar',
    prev: 'Captura anterior',
    next: 'Captura siguiente',
    of: 'de',
  },
}

export const aboutSection = {
  id: 'sobre-mi',
  eyebrow: '02 · Sobre mí',
  title: 'De la base de datos al despliegue, y después también',
  workStyleTitle: 'forma_de_trabajo',
  workStyleSubtitle: 'checklist',
}

export const stackSection = {
  id: 'stack',
  eyebrow: '03 · Stack',
  title: 'Herramientas con las que trabajo',
  intro: 'Las tecnologías que uso en los proyectos y en la operación diaria de sistemas en producción.',
}

export const experienceSection = {
  id: 'experiencia',
  eyebrow: '04 · Experiencia',
  title: 'Trayectoria',
  active: 'activo',
  education: 'Formación',
}

export const certificationsSection = {
  id: 'certificaciones',
  eyebrow: '05 · Certificaciones',
  title: 'Formación continua',
  verify: 'Verificar credencial ↗',
  newTab: '(se abre en una pestaña nueva)',
}

export const socialSection = {
  id: 'compromiso-social',
  eyebrow: '06 · Compromiso social',
  exampleEyebrow: 'Ejemplo',
  exampleCta: 'Ver caso de estudio →',
  cta: 'Contame tu proyecto',
}

export const contactSection = {
  id: 'contacto',
  eyebrow: '07 · Contacto',
  title: 'Hablemos de tu proyecto',
  intro: 'Contame qué necesitás y te respondo a la brevedad. Si preferís, escribime directo por WhatsApp.',
  channelsLabel: 'Canales de contacto',
  whatsappLabel: 'WhatsApp',
  emailLabel: 'Email',
  copy: 'Copiar',
  copied: 'Copiado',
  copyFailed: 'No se pudo copiar',
  linkedinLabel: 'LinkedIn',
  githubLabel: 'GitHub',
  newTab: '(se abre en una pestaña nueva)',
  form: {
    title: 'Enviame un mensaje',
    name: 'Nombre',
    email: 'Email',
    type: 'Tipo de consulta',
    typePlaceholder: 'Elegí una opción',
    message: 'Mensaje',
    messagePlaceholder: 'Contame brevemente qué necesitás…',
    honeypot: 'No completes este campo si sos humano',
    submit: 'Enviar mensaje',
    sending: 'Enviando…',
    successTitle: 'Gracias, te respondo pronto.',
    successText: 'Tu mensaje llegó bien.',
    sendAnother: 'Enviar otro mensaje',
    errorTitle: 'No se pudo enviar el mensaje.',
    errorText: 'Probá de nuevo en un rato o escribime por WhatsApp:',
    errorCta: 'Escribir por WhatsApp',
    errors: {
      nameRequired: 'Escribí tu nombre.',
      emailRequired: 'Escribí tu email.',
      emailInvalid: 'Revisá el email: parece que tiene un error.',
      typeRequired: 'Elegí el tipo de consulta.',
      messageRequired: 'Escribí tu mensaje.',
      messageShort: 'Contame un poco más (al menos 10 caracteres).',
    },
    devNotice:
      '[Contacto] En desarrollo el formulario no se envía: Netlify Forms solo funciona en el sitio publicado. Se simula un envío exitoso.',
  },
}
