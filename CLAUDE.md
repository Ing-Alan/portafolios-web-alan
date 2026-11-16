# Portafolio — Alan Alvarenga

## Contexto
- Alan Alvarenga: desarrollador full stack y supervisor de sistemas en producción, de Areguá, Paraguay.
- La web es para **clientes y reclutadores**. Los protagonistas son los **proyectos**.
- Idioma: español con voseo paraguayo/rioplatense ("contactame", "mirá", "escribime").
- `Referencia/` (con R mayúscula) tiene la vista previa aprobada (`Referencia/vista-previa-inicio.html`, **"Opción 1 Consola"**) y las capturas originales de los proyectos. Esa vista previa es la **fuente de verdad del diseño**: colores, tipografías, tamaños y estilo de componentes.
- Se trabaja por etapas: hacer solo lo que pide cada etapa y mostrar un plan antes de escribir código.

## Stack
Vite · React 19 · TypeScript (estricto) · Tailwind CSS v4 (`@tailwindcss/vite`, sin `tailwind.config`) · React Router 7 · Framer Motion · despliegue en Netlify (`netlify.toml`).

Comandos: `npm run dev` · `npm run build` · `npm run typecheck` · `npm run images` (convierte las capturas de `Referencia/portafolio-imagenes/` a WebP en `src/assets/projects/`).

## Estructura
```
src/
  components/   componentes reutilizables (Layout, Navbar, Footer, ThemeToggle, ThemeProvider, Logo…)
  sections/     una sección de la página principal por archivo
  pages/        Home, ProjectPage, NotFound
  data/         TODO el contenido del sitio, tipado (types.ts)
  hooks/        useTheme, etc.
  styles/       tokens.css (variables) + index.css (Tailwind + base)
  assets/projects/<slug>/   capturas en WebP (generadas con npm run images)
scripts/        optimize-images.mjs
```

Rutas: `/` → Home · `/proyectos/:slug` → ProjectPage · `*` → NotFound.
Anclas de Home: `#proyectos`, `#sobre-mi`, `#stack`, `#contacto` (definidas en `src/data/site.ts`).
Slugs: `sistema-odontologico`, `sistema-parroquial`, `vacaciones-y-permisos`.

## Regla de contenido
**Todo el texto visible vive en `src/data/`**, nunca escrito dentro de los componentes (incluye etiquetas de botones, aria-labels, textos alternativos y mensajes de error). Los componentes solo leen y muestran datos. Los tipos están en `src/data/types.ts`.

Archivos: `site.ts` (navegación, footer, 404), `profile.ts`, `projects.ts`, `experience.ts`, `stack.ts`, `certifications.ts`, `social.ts`, `contact.ts`.

## Tokens de diseño
Definidos en `src/styles/tokens.css` como variables CSS y expuestos a Tailwind con `@theme inline` en `src/styles/index.css` (`bg-surface`, `text-muted`, `border-rule`, `text-accent`, `font-display`, `font-mono`…). La paleta de Tailwind por defecto está desactivada: usar solo estos tokens. No usar `dark:`; el cambio de tema lo resuelven las variables.

| Token | Claro | Oscuro |
|---|---|---|
| `--bg` | `#E9EFF6` | `#050D1A` |
| `--surface` | `#FFFFFF` | `#0C1A30` |
| `--surface-2` | `#F4F7FB` | `#0A1628` |
| `--ink` | `#0B1B33` | `#E4EDF8` |
| `--muted` | `#566A84` | `#8DA1BD` |
| `--rule` | `#D3DDEA` | `#1C3150` |
| `--line` | `#2C7FC9` | `#5DB9F2` |
| `--accent` | `#1663B8` | `#5DB9F2` |
| `--accent-ink` | `#FFFFFF` | `#04101F` |
| `--grid` | `rgba(44,127,201,.10)` | `rgba(93,185,242,.08)` |
| `--nanduti` | `#2C7FC9` | `#5DB9F2` |
| `--hero` | `#F7FAFD` | `#071325` |
| `--ok` / `--ok-bg` | `#11845A` / `#DFF3EA` | `#3DD598` / `rgba(61,213,152,.12)` |
| `--warn` / `--warn-bg` | `#A86A12` / `#FBEFD9` | `#F4B547` / `rgba(244,181,71,.12)` |
| `--err` | `#B83A33` | `#F2776F` |

Tipografías (Google Fonts, cargadas en `index.html`):
- **Sora** (500–800) — títulos → `font-display`
- **Manrope** (400–700) — texto → `font-body` (por defecto)
- **JetBrains Mono** (400–700) — datos, etiquetas y terminal → `font-mono`

Detalles de la vista previa a respetar: logo `alan<span class="text-accent">.</span>dev` en mono; eyebrow en mono, mayúsculas, `tracking .08em`, color accent; botones con radio 10px (`pri`: fondo accent; `sec`: borde rule); paneles con superficie, borde rule y radio 14px; pills con `ok-bg`/`ok` o `warn-bg`/`warn`; breakpoint de navegación en 820px (`nav:`).

### Tema
Tres estados: **Sistema** (por defecto), **Claro**, **Oscuro**. Se aplica con `data-theme` en `<html>` (sin atributo = sigue al sistema) y se guarda en `localStorage` con la clave `theme`. Un script inline en `index.html` lo aplica antes del primer pintado para evitar el parpadeo. Estado compartido con `ThemeProvider` y `useTheme()`.

## Reglas permanentes
- **Accesible:** foco visible, contraste correcto en ambos temas, textos alternativos en todas las imágenes, HTML semántico y navegación por teclado.
- **Respetar `prefers-reduced-motion`:** sin animaciones si el usuario las desactivó (`MotionConfig reducedMotion="user"` + regla global en CSS; animaciones en canvas o JS deben comprobarlo).
- **Responsive desde 360px**, sin scroll horizontal.
- **Nunca nombrar clientes reales:** describir a los clientes de forma genérica ("clínica odontológica privada", "estudio jurídico"…). La regla aplica a clientes de proyectos; los empleadores en la experiencia laboral sí se nombran.
- **TypeScript estricto, sin `any`.**
