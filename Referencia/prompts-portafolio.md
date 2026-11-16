# Portafolio web de Alan Alvarenga — Prompts de construcción

Prompts para usar en **Claude Code**, en orden. Cada uno es una etapa: pegás el prompt, revisás el plan que te propone, lo aprobás, y al terminar revisás la lista "Antes de seguir" y hacés un commit.

---

## Paso 0 — Preparación (manual, sin prompt)

1. Creá una carpeta vacía para el proyecto, por ejemplo `portafolio`.
2. Adentro, creá una carpeta `referencia/` y copiá:
   - `vista-previa-inicio.html` (la vista previa aprobada, Opción 1 Consola).
   - La carpeta `portafolio-imagenes/` completa, con sus tres subcarpetas.
   - Este archivo (`prompts-portafolio.md`).
3. Abrí Claude Code en esa carpeta.

Estructura esperada:

```
portafolio/
└── referencia/
    ├── vista-previa-inicio.html
    ├── prompts-portafolio.md
    └── portafolio-imagenes/
        ├── sistema-odontologico/      (3 imágenes)
        ├── sistema-parroquial/        (5 imágenes)
        └── sistema-vacaciones-permisos/ (6 imágenes)
```

---

## Prompt 1 — Proyecto base, CLAUDE.md y tema visual

```
Vamos a construir mi portafolio web personal. Antes de escribir código, mostrame un plan breve de esta etapa y esperá mi aprobación. Trabajamos por etapas: hacé solo lo que pide este prompt.

CONTEXTO
- Soy Alan Alvarenga, desarrollador full stack y supervisor de sistemas en producción, de Areguá, Paraguay.
- La web es para clientes y reclutadores. Los protagonistas son mis proyectos.
- Idioma: español (voseo paraguayo/rioplatense: "contactame", "mirá").
- La carpeta referencia/ tiene la vista previa aprobada (referencia/vista-previa-inicio.html, "Opción 1 Consola") y las capturas de los proyectos. Esa vista previa es la fuente de verdad del diseño: colores, tipografías, tamaños y estilo de componentes.

TAREAS
1. Inicializá un proyecto con Vite + React + TypeScript (modo estricto) en la raíz.
2. Instalá y configurá Tailwind CSS, React Router y Framer Motion.
3. Pasá los tokens de diseño de la vista previa a variables CSS y al tema de Tailwind:
   - Colores para modo claro y oscuro (bg, surface, surface-2, ink, muted, rule, line, accent, accent-ink, grid, nanduti, hero, ok, ok-bg, warn, warn-bg, err), con exactamente los mismos valores de la vista previa.
   - Tipografías: Sora (títulos), Manrope (texto), JetBrains Mono (datos, etiquetas y terminal), desde Google Fonts, con fuentes de respaldo.
4. Tema claro/oscuro con tres estados: Sistema (por defecto, sigue al sistema operativo), Claro y Oscuro. Se aplica con el atributo data-theme en <html> y se recuerda en localStorage. Evitá el parpadeo al cargar (script inline en index.html).
5. Estructura de carpetas:
   src/
     components/   (componentes reutilizables)
     sections/     (una sección de la página principal por archivo)
     pages/        (Home, ProjectPage, NotFound)
     data/         (todo el contenido, sin textos dentro de los componentes)
     hooks/
     styles/
     assets/projects/<slug>/
6. Rutas:
   /                                   → Home
   /proyectos/:slug                    → ProjectPage
   *                                   → NotFound
7. Layout base: barra de navegación (logo "alan.dev" en mono, links a las secciones con anclas, selector de tema) y un footer simple. La navegación se adapta a celular con un menú desplegable.
8. Creá netlify.toml con el build de Vite y la redirección de SPA (/* → /index.html 200).
9. Creá un CLAUDE.md en la raíz con: el contexto de arriba, la estructura de carpetas, la regla de que el contenido vive en src/data, los tokens de diseño, y estas reglas permanentes:
   - Accesible: foco visible, contraste correcto en ambos temas, textos alternativos en imágenes.
   - Respetar prefers-reduced-motion: sin animaciones si el usuario las desactivó.
   - Responsive desde 360px, sin scroll horizontal.
   - Nunca nombrar clientes reales: todo genérico.
   - TypeScript estricto, sin any.

Al final, dejá corriendo el servidor de desarrollo y decime qué revisar.
```

**Antes de seguir:** la web abre, el selector de tema cambia claro/oscuro/sistema sin parpadeo, los colores coinciden con la vista previa y existe el `CLAUDE.md`.

---

## Prompt 2 — Contenido e imágenes

```
Leé CLAUDE.md. Mostrame un plan breve y esperá mi aprobación.

Esta etapa carga TODO el contenido del sitio en src/data, con tipos de TypeScript, y prepara las imágenes. Todavía no construyas secciones visuales.

1. IMÁGENES
Convertí las capturas de referencia/portafolio-imagenes/ a WebP (ancho máximo 1600px, buena calidad) con un script de Node usando sharp (scripts/optimize-images.mjs), y guardalas en src/assets/projects/<slug>/ con los mismos nombres. Slugs:
- sistema-odontologico
- sistema-parroquial
- vacaciones-y-permisos  (origen: sistema-vacaciones-permisos)

2. ARCHIVOS DE DATOS

src/data/profile.ts
- nombre: Alan Alvarenga (nombre completo: Alan Gustavo Alvarenga Ojeda)
- rol: Desarrollador Full Stack · Supervisor de Sistemas en Producción
- ubicación: Areguá, Paraguay
- bajada: "Construyo sistemas de gestión web seguros, de la base de datos al despliegue, y sé lo que pasa con ellos cuando ya están en producción."
- disponibilidad: "Disponible para proyectos"
- panel del hero: disponibilidad, sistemas_en_produccion = 2, en_implementacion = 1, stack = "React · TS · PostgreSQL"
- línea de terminal: comando "npm run deploy", resultado "✓ Desplegado en Netlify · RLS activo · Ley 7593/2025"
- sobre mí (párrafos):
  1. "Desarrollo sistemas de gestión web a medida para organizaciones y empresas que necesitan dejar atrás el papel y las planillas dispersas. Me encargo del proyecto completo: entiendo la necesidad, diseño la base de datos y la solución, la construyo y la dejo funcionando en la nube."
  2. "Trabajo con desarrollo asistido por IA, con la arquitectura, la seguridad y la revisión de código a mi cargo. Defino el modelo de datos, las reglas de seguridad y las fases del proyecto, reviso cada cambio y exijo tests antes de dar algo por terminado."
  3. "Además, superviso sistemas en producción en una empresa de telecomunicaciones. Esa experiencia me hace pensar en lo que pasa después del despliegue: monitoreo, estabilidad y continuidad del servicio."
  4. "Estudio la Licenciatura en Ciencias Informáticas en la Facultad Politécnica de la UNA."
- forma de trabajo (4 puntos cortos): "Análisis antes de construir", "Seguridad desde el diseño", "Entregas por fases revisables", "Comunicación clara, sin tecnicismos innecesarios".

src/data/projects.ts — tres proyectos. Cada uno con: slug, nombre, tipo de cliente, estado ("En producción" | "En implementación"), etiquetas extra, resumen corto (tarjeta), problema, solución, funciones principales, decisiones técnicas destacadas, stack, rol, nota de confidencialidad e imágenes (archivo, título, alt y anotaciones).

  A) sistema-odontologico
  - Nombre: Sistema de gestión odontológica. Cliente: clínica odontológica privada. Estado: En producción.
  - Resumen: "Agenda, ficha clínica, odontograma y cobros en un solo sistema."
  - Problema: historias clínicas, turnos y cobros manejados en papel y planillas, sin trazabilidad.
  - Funciones: agenda por día y hora con estados del turno; ficha del paciente con alertas clínicas; odontograma interactivo en notación FDI; evolución clínica con auditoría inmutable; consentimiento informado con firma digital; presupuestos con plan de pago en cuotas; cuenta corriente en guaraníes sin decimales; recordatorios por WhatsApp.
  - Decisiones técnicas: seguridad a nivel de base de datos (RLS) por clínica; auditoría con triggers inmutables; esquema preparado para varios profesionales y sedes; cumplimiento de la Ley 7593/2025 de Protección de Datos Personales.
  - Stack: React, TypeScript, Vite, Tailwind CSS, Supabase (PostgreSQL, Auth, RLS, Edge Functions), Netlify.
  - Rol: "Análisis, arquitectura, seguridad y despliegue."
  - Imágenes y anotaciones (título + 2 o 3 anotaciones cada una):
    01-agenda: "Agenda diaria" → "Estados del turno: confirmada, en espera, atendida, ausente" · "Turnos libres a un clic"
    02-ficha-paciente-odontograma: "Ficha y odontograma" → "Odontograma en notación FDI" · "Alertas clínicas visibles" · "Evolución, presupuestos y cuenta en pestañas"
    03-presupuesto: "Presupuesto" → "Montos en guaraníes sin decimales" · "Plan de pago en cuotas con vencimientos"

  B) sistema-parroquial
  - Nombre: Sistema de gestión parroquial. Cliente: parroquia con varias capillas (organización sin fines de lucro). Estado: En producción. Etiqueta extra: "Donado".
  - Resumen: "Feligreses, catequesis, asistencia y pagos para una parroquia con varias capillas."
  - Problema: registros en papel, datos duplicados entre capillas, sin historial de sacramentos ni reportes consolidados.
  - Funciones: 4 roles (administrador, encargado de capilla, catequista, secretaría); feligreses con historial de sacramentos; grupos de catequesis con control de cupos; asistencia con un clic; pagos de aranceles; constancias en PDF; reportes por capilla y consolidados.
  - Decisiones técnicas: cada capilla solo ve sus datos gracias a RLS; construido solo con capas gratuitas en la nube, sin costo para la organización; implementación gradual con una capilla piloto.
  - Stack: React, TypeScript, Vite, Tailwind CSS, Supabase (PostgreSQL, Auth, RLS), @react-pdf/renderer, Netlify.
  - Rol: "Lideré y doné el proyecto, desarrollado junto a un equipo de voluntarios."
  - Imágenes:
    01-acceso: "Acceso por rol" → "Cada usuario entra directo a su área"
    02-dashboard-administrador: "Panel del administrador" → "Resumen por capilla" · "Indicadores globales"
    03-feligreses: "Feligreses" → "Sacramentos con etiquetas de color" · "Búsqueda y filtros"
    04-inscripcion-catequesis: "Inscripción" → "Autocompletado del feligrés" · "Control de cupos por grupo"
    05-asistencia: "Asistencia" → "Presente o ausente con un clic" · "Resumen de asistencia del grupo"

  C) vacaciones-y-permisos
  - Nombre: Sistema de vacaciones y permisos. Cliente: estudio jurídico. Estado: En implementación.
  - Resumen: "Solicitudes, aprobación en dos pasos y saldos de vacaciones automáticos."
  - Problema: pedidos de vacaciones y permisos por mail o en papel, sin control de saldos ni registro de quién aprobó qué.
  - Funciones: 4 roles (solicitante, jefe inmediato, RRHH, RRHH-Carga); flujo de aprobación en dos pasos; cálculo automático de días hábiles excluyendo fines de semana y feriados; medio día; saldos por período según antigüedad; anulaciones que devuelven días; adjuntos médicos en almacenamiento privado; notificaciones por email.
  - Decisiones técnicas: máquina de estados con historial de transiciones; descuentos de saldo atómicos; nadie puede aprobar su propia solicitud; auditoría inmutable; validación en cliente y servidor; tests automatizados (Vitest, React Testing Library, Playwright) y CI con GitHub Actions.
  - Stack: React, TypeScript, Vite, Tailwind CSS, TanStack Query, React Hook Form + Zod, Supabase (PostgreSQL, Auth, Storage, RLS, Edge Functions), Resend, Netlify, GitHub Actions.
  - Rol: "Dirección técnica, arquitectura y revisión de código, con desarrollo asistido por IA."
  - Imágenes:
    01-acceso: "Ingreso" → "Acceso con correo institucional"
    02-panel-solicitante: "Panel del solicitante" → "Calendario con días no laborables" · "Saldos por período"
    03-nueva-solicitud: "Nueva solicitud" → "Cálculo automático de días hábiles" · "Adjunto en almacenamiento privado"
    04-bandeja-jefe: "Bandeja del jefe" → "Cada jefe ve solo a su equipo (RLS)"
    05-revision-rrhh: "Revisión de RRHH" → "Línea de tiempo de aprobaciones" · "Cada acción queda en la auditoría"
    06-configuracion: "Configuración" → "Tipos de solicitud configurables" · "Permisos limitados para RRHH-Carga"

  Nota de confidencialidad para los tres: "Sistema de uso interno. El código es privado por confidencialidad del cliente. Las capturas usan datos de prueba."

  Anotaciones: cada una con texto y posición (x, y en % sobre la imagen). Dejá posiciones iniciales razonables; las ajusto después mirando el resultado.

src/data/experience.ts
- Desarrollador Full Stack · Profesional independiente · feb. 2025 – actualidad · Remoto
- Supervisor de Sistemas en Producción · Núcleo S.A. (Personal Paraguay) · dic. 2024 – actualidad · Asunción. Puntos: monitoreo de disponibilidad y rendimiento con Nagios y Grafana; respuesta y escalamiento de incidentes; operación de servidores Linux; documentación de procesos con AWX, Ansible e InvGate.
- Soporte técnico · Avanza Paraguay S.A. · sep. – dic. 2024 · Asunción. Punto: soporte de primera línea para fibra óptica y TV satelital.
- Formación: Licenciatura en Ciencias Informáticas · Facultad Politécnica, UNA · en curso.

src/data/stack.ts — tres grupos:
- Frontend: React, TypeScript, JavaScript, Tailwind CSS, Vite, HTML5, CSS3
- Backend y datos: PostgreSQL, Supabase, RLS, Edge Functions, APIs REST, Python
- Infraestructura y calidad: Git, GitHub Actions, Netlify, Linux, Bash, Nagios, Grafana, Vitest, Playwright

src/data/certifications.ts (con URL de verificación; dejá "URL_PENDIENTE" donde no la tenga):
- Python Essentials 1 — Cisco Networking Academy — oct. 2023
- Python Essentials 2 — Cisco Networking Academy — feb. 2025
- Curso completo de Hacking Ético y Ciberseguridad — Udemy — feb. 2025
- Hacking Ético: virus, troyanos, spyware y malware — Udemy — nov. 2025
- Curso completo de Linux: comandos y Shell Script — Udemy — may. 2026
- Complete Claude Code Course: Develop Applications with AI — Udemy — jul. 2026

src/data/social.ts (Compromiso social)
- Título: "Tecnología con propósito"
- Texto: "Colaboro con parroquias, fundaciones, organizaciones sin fines de lucro y grupos comunitarios que necesitan ordenar su información pero no tienen presupuesto para un sistema."
- Modalidad: "Evalúo cada caso según el presupuesto y la finalidad del proyecto: desde la donación total hasta un precio solidario."
- Ejemplo: el sistema parroquial (link a su página).
- Llamado a la acción: "¿Tu organización necesita ayuda? Contame el proyecto."

src/data/contact.ts
- WhatsApp: +595 982 283750 → https://wa.me/595982283750 con mensaje inicial "Hola Alan, vi tu portafolio y quería consultarte por..."
- Email: alvarengaojedaa03@gmail.com
- LinkedIn: https://www.linkedin.com/in/alan-alvarenga-ojeda
- GitHub: https://github.com/Ing-Alan
- Tipos de consulta del formulario: "Proyecto o sistema", "Oportunidad laboral", "Colaboración social", "Otro".

Al terminar, listame los archivos creados y cualquier dato que haya quedado pendiente.
```

**Antes de seguir:** revisá los textos uno por uno (son los que va a leer la gente), corregí lo que no te guste directamente en `src/data` y completá las URL de las certificaciones.

---

## Prompt 3 — Componente Ñandutí

```
Leé CLAUDE.md. Mostrame un plan breve y esperá mi aprobación.

Creá el componente src/components/Nanduti.tsx: un ñandutí (encaje paraguayo) generado en <canvas>, portando la lógica de referencia/vista-previa-inicio.html (funciones build, size, draw y weave).

Requisitos:
- Props: centro (cx, cy en proporción del contenedor), radio, opacidad, cantidad de rayos, cantidad de anillos, modo de radio, duración de la animación y si se teje al montar.
- Se dibuja en orden de tejido: rosa central, rayos (urdimbre), anillos y pétalos del centro hacia afuera, borde festoneado.
- Animación de tejido al montar con easing (ease-out cúbico).
- Toma el color de la variable CSS --nanduti y se redibuja al cambiar el tema (claro/oscuro/sistema).
- Se adapta al tamaño del contenedor (ResizeObserver) y a pantallas de alta densidad (devicePixelRatio, máximo 2).
- Con prefers-reduced-motion se dibuja completo, sin animación.
- No bloquea clics (pointer-events: none), es decorativo (aria-hidden).
- Expone una función para repetir la animación.
- Cuidá el rendimiento: calculá la geometría solo cuando cambia el tamaño, no en cada frame.

Mostralo en una página temporal /dev/nanduti con controles para probar los parámetros. Esa página se borra al final del proyecto.
```

**Antes de seguir:** el ñandutí se teje igual que en la vista previa, cambia de color con el tema y se ve nítido en el celular.

---

## Prompt 4 — Hero (Opción 1 Consola)

```
Leé CLAUDE.md. Mostrame un plan breve y esperá mi aprobación.

Construí src/sections/Hero.tsx replicando la "Opción 1 — Consola" de referencia/vista-previa-inicio.html, usando los datos de src/data/profile.ts.

- Izquierda: ubicación (eyebrow en mono), nombre grande, rol, bajada y dos botones: "Ver proyectos →" (lleva a la sección proyectos) y "Contactar" (lleva a contacto).
- Derecha: panel de estado tipo consola de monitoreo, con encabezado "estado · panel en vivo" e indicador "online" con punto pulsante; filas clave-valor (disponibilidad como pastilla verde, sistemas_en_produccion, en_implementacion, stack); y un bloque de terminal.
- Ñandutí de fondo detrás del texto (cx 0.1, cy 0.55, radio 0.6, opacidad 0.2, 40 rayos, 7 anillos), como en la vista previa.
- Secuencia de entrada (llamativa pero ordenada):
  1. El ñandutí se teje (unos 2,6 s).
  2. Nombre, rol, bajada y botones aparecen escalonados (Framer Motion).
  3. El panel entra con un leve desplazamiento; los contadores suben de 0 a su valor.
  4. La terminal escribe el comando y luego el resultado, con cursor parpadeante.
- Todo el contenido tiene que poder leerse aunque la animación no corra (estado final visible por defecto).
- Con prefers-reduced-motion: todo aparece directo.
- En celular: una columna, el panel debajo del texto, el ñandutí más chico y tenue para no tapar el texto.
- El hero no ocupa 100vh: se ajusta a su contenido.
```

**Antes de seguir:** compará con la vista previa en claro y oscuro, en escritorio y en celular. Revisá que el texto se lea bien sobre el ñandutí.

---

## Prompt 5 — Proyectos y páginas de caso de estudio

```
Leé CLAUDE.md. Mostrame un plan breve y esperá mi aprobación.

1. SECCIÓN PROYECTOS (src/sections/Projects.tsx)
- Título de sección y una línea de introducción.
- Una tarjeta por proyecto, con estética de "servicio" en un panel de monitoreo: indicador de estado (punto verde "En producción", ámbar "En implementación"), etiqueta extra si tiene ("Donado"), nombre, resumen, la primera captura como miniatura, 3 o 4 tecnologías principales y el link "Ver caso de estudio →".
- La tarjeta completa es clickeable y tiene foco visible.

2. PÁGINA DE PROYECTO (src/pages/ProjectPage.tsx, ruta /proyectos/:slug)
- Encabezado: volver al inicio, nombre, tipo de cliente, estado y etiquetas.
- Bloques: Problema, Solución, Funciones principales, Decisiones técnicas, Stack, Mi rol, y la nota de confidencialidad.
- Galería de capturas con el efecto "plano técnico": cada captura dentro de un marco de navegador, con fondo de grilla fina detrás, y sus anotaciones. Al entrar en pantalla, desde cada anotación se dibuja una línea (SVG con stroke-dashoffset) hacia el punto que señala, y la etiqueta aparece. Las líneas usan el color --line y la tipografía mono.
- En celular, las anotaciones pasan a una lista numerada debajo de la imagen, con números sobre la imagen que coinciden (las líneas no entran bien en pantallas chicas).
- Clic en una captura: se abre ampliada (lightbox) con navegación entre capturas y cierre con Escape.
- Al final: links al proyecto anterior y siguiente, y un botón "Contactame por un proyecto así".
- Si el slug no existe, mostrar NotFound.
- Al entrar a la página, scroll arriba y título de la pestaña actualizado.

Las imágenes con lazy loading, ancho y alto definidos para evitar saltos.
Después de construir, ajustá las posiciones de las anotaciones mirando cada captura para que apunten al elemento correcto.
```

**Antes de seguir:** entrá a los tres casos de estudio, revisá que cada anotación apunte bien y probá el lightbox con teclado.

---

## Prompt 6 — Sobre mí, Stack, Experiencia y Certificaciones

```
Leé CLAUDE.md. Mostrame un plan breve y esperá mi aprobación.

Construí estas secciones con los datos de src/data, manteniendo la estética de panel/consola:

1. Sobre mí (src/sections/About.tsx): los párrafos de profile.ts y los 4 puntos de "forma de trabajo" como una lista tipo checklist en mono, con tildes verdes.

2. Stack (src/sections/Stack.tsx): los tres grupos como tres paneles, cada tecnología como una "chip" con borde. Sin barras de porcentaje ni niveles inventados.

3. Experiencia (src/sections/Experience.tsx): línea de tiempo vertical. Cada entrada con cargo, organización, fechas, modalidad y puntos. Las experiencias actuales llevan un indicador "activo" con punto pulsante. La formación va al final como entrada propia.

4. Certificaciones (src/sections/Certifications.tsx): grilla de tarjetas con emisor, nombre y fecha. Si tiene URL, el link "Verificar credencial ↗" abre en pestaña nueva. Si la URL es "URL_PENDIENTE", no se muestra el link.

Animaciones: aparición suave al entrar en pantalla (Framer Motion, una sola vez), con el contenido visible si las animaciones están desactivadas.
```

**Antes de seguir:** leé cada sección completa en el celular.

---

## Prompt 7 — Compromiso social y Contacto

```
Leé CLAUDE.md. Mostrame un plan breve y esperá mi aprobación.

1. COMPROMISO SOCIAL (src/sections/Social.tsx)
- Con los datos de src/data/social.ts.
- Esta sección lleva un segundo ñandutí de fondo, más grande y tenue, centrado a la derecha (es la sección que más se relaciona con la identidad paraguaya).
- Una tarjeta que muestra el sistema parroquial como ejemplo, con link a su caso de estudio.
- Botón "Contame tu proyecto" que lleva al formulario con el tipo de consulta "Colaboración social" ya seleccionado.

2. CONTACTO (src/sections/Contact.tsx)
- Columna izquierda: título, una línea de invitación y los canales:
  - WhatsApp: botón con el número visible y link wa.me con el mensaje inicial.
  - Email: dirección visible como texto seleccionable y botón "Copiar" (navigator.clipboard con respaldo si falla; muestra "Copiado").
  - LinkedIn y GitHub: links que abren en pestaña nueva.
- Columna derecha: formulario con Netlify Forms:
  - Campos: nombre, email, tipo de consulta (select con los tipos de contact.ts), mensaje.
  - Validación con mensajes claros debajo de cada campo.
  - Anti-spam con campo honeypot (netlify-honeypot).
  - Como es una SPA, agregá también un formulario oculto estático en index.html con el mismo nombre y campos, para que Netlify lo detecte al hacer el build.
  - Envío por fetch (POST application/x-www-form-urlencoded con form-name), sin recargar la página.
  - Estados: enviando, enviado ("Gracias, te respondo pronto") y error (con alternativa: escribirme por WhatsApp).
  - Si la URL trae ?tipo=social, preseleccioná "Colaboración social".
- En local el formulario no envía de verdad: mostrá un aviso en la consola solo en desarrollo.
```

**Antes de seguir:** probá la validación, el botón de copiar y que el link de WhatsApp abra con el mensaje.

---

## Prompt 8 — Página principal completa, animaciones y pulido

```
Leé CLAUDE.md. Mostrame un plan breve y esperá mi aprobación.

1. Armá Home con las secciones en este orden: Hero, Proyectos, Sobre mí, Stack, Experiencia, Certificaciones, Compromiso social, Contacto.
2. Navegación: los links llevan a cada sección con scroll suave y compensan la altura de la barra fija. La barra marca la sección activa. Al venir desde una página de proyecto, los links llevan al inicio y a la sección.
3. Footer: nombre, "Hecho con React, TypeScript y Tailwind · Areguá, Paraguay", año actual, links a LinkedIn, GitHub y al repositorio del portafolio.
4. Página 404 con la estética de terminal: "error 404 · página no encontrada" y un botón para volver al inicio.
5. Revisión completa:
   - Responsive en 360px, 768px, 1024px y 1440px, sin scroll horizontal.
   - Contraste y foco visible en ambos temas.
   - Navegación completa con teclado.
   - prefers-reduced-motion respetado en todo el sitio.
   - Que las animaciones no se repitan cada vez que se hace scroll arriba y abajo.
6. Borrá la página temporal /dev/nanduti.
7. Pasame una lista de lo que encontraste y corregiste.
```

**Antes de seguir:** recorré toda la web en el celular y en la computadora, en ambos temas. Anotá lo que quieras pulir: este es el momento de pedir cambios de diseño.

---

## Prompt 9 — SEO y rendimiento

```
Leé CLAUDE.md. Mostrame un plan breve y esperá mi aprobación.

1. SEO
- Título y descripción por página (inicio y cada proyecto).
- Etiquetas Open Graph y Twitter para que el link se vea bien al compartirlo en LinkedIn y WhatsApp.
- Generá una imagen de vista previa (public/og-image.png, 1200×630) con la estética del hero: fondo navy, ñandutí tenue, nombre y rol.
- Favicon a partir del logo "alan.dev" o del ñandutí, en SVG y PNG.
- lang="es" en el documento.
- robots.txt y sitemap.xml con todas las rutas, usando el dominio https://alanalvarenga.dev (lo cambio si compro otro).
- Datos estructurados JSON-LD tipo Person (nombre, rol, ubicación, LinkedIn, GitHub).

2. RENDIMIENTO
- Imágenes con lazy loading, tamaños correctos y srcset donde convenga.
- Fuentes con display=swap y preconnect.
- Code splitting de las páginas de proyecto.
- Corré un build de producción y revisá el tamaño del bundle.
- Pasame qué mejorarías para llegar a 90+ en Lighthouse (rendimiento, accesibilidad, buenas prácticas y SEO).
```

**Antes de seguir:** `npm run build` sin errores y `npm run preview` funcionando.

---

## Prompt 10 — Publicación con dominio propio

```
Leé CLAUDE.md. Guiame paso a paso para publicar el portafolio. No ejecutes nada que necesite mis cuentas sin avisarme antes.

1. GitHub: inicializá git si falta, revisá que no se suba nada privado (.env, claves, la carpeta referencia/ si no quiero publicarla) y preparame el commit inicial. El repositorio será público como parte de mi portafolio. Escribí un README atractivo: qué es, stack, cómo correrlo, capturas y link a la web.
2. Netlify: explicame cómo conectar el repo, qué configuración de build usar (ya está en netlify.toml) y cómo activar las notificaciones por email de Netlify Forms para recibir los mensajes del formulario.
3. Dominio: explicame cómo conectar el dominio que compre (alanalvarenga.dev u otro) a Netlify, cómo verificar el HTTPS y cómo redirigir el subdominio .netlify.app al dominio principal.
4. Checklist final de producción: formulario probado en el sitio publicado, links de WhatsApp/email/LinkedIn/GitHub, vista previa al compartir en LinkedIn y WhatsApp, sitemap accesible, 404 funcionando.
```

**Al terminar:** agregá la URL de la web a tu LinkedIn (sección Contacto y Destacados), al CV y a tu perfil de GitHub.

---

## Notas para trabajar con estos prompts

- **Un prompt por sesión de trabajo.** Si una etapa queda grande, pedile a Claude Code que la divida.
- **Commit después de cada etapa.** Así podés volver atrás si algo sale mal.
- **Pedí explicaciones.** Al final de cada etapa, preguntá "explicame cómo funciona X" sobre la parte más importante (por ejemplo el ñandutí o el formulario). Eso te prepara para contarlo en una entrevista.
- **Los textos están en src/data.** Si querés cambiar una frase, no hace falta un prompt: editás el archivo.
