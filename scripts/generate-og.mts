// Genera public/og-image.png (1200×630) con la estética del hero y los favicons PNG.
// Reutiliza la geometría real del ñandutí (Node ≥ 22.6 ejecuta TypeScript directo).
// Uso: npm run og
import { mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { buildNanduti } from '../src/components/nanduti/geometry.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = path.join(root, 'public')
await mkdir(PUBLIC, { recursive: true })

// Tokens del tema oscuro (src/styles/tokens.css)
const C = { bg: '#050D1A', hero: '#071325', ink: '#E4EDF8', muted: '#8DA1BD', accent: '#5DB9F2', rule: '#1C3150', ok: '#3DD598' }
const W = 1200
const H = 630

/** Ñandutí como un único <path> SVG */
function nandutiPath(cx: number, cy: number, r: number, spokes: number, rings: number): string {
  const g = buildNanduti(cx, cy, r, spokes, rings)
  return g.lines
    .map(({ pts }) => {
      let d = `M${pts[0]!.toFixed(1)} ${pts[1]!.toFixed(1)}`
      for (let i = 2; i < pts.length; i += 2) d += `L${pts[i]!.toFixed(1)} ${pts[i + 1]!.toFixed(1)}`
      return d
    })
    .join('')
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

const display = "Sora, 'Segoe UI', Arial, sans-serif"
const body = "Manrope, 'Segoe UI', Arial, sans-serif"
const mono = "'JetBrains Mono', Consolas, 'Courier New', monospace"

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="78%" cy="45%" r="60%">
      <stop offset="0" stop-color="${C.hero}"/>
      <stop offset="1" stop-color="${C.bg}"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <path d="${nandutiPath(980, 300, 420, 44, 8)}" fill="none" stroke="${C.accent}" stroke-opacity=".2" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="${C.accent}"/>

  <text x="80" y="96" font-family="${mono}" font-weight="700" font-size="30" fill="${C.ink}">alan<tspan fill="${C.accent}">.</tspan>dev</text>

  <text x="80" y="268" font-family="${mono}" font-weight="600" font-size="22" letter-spacing="3" fill="${C.accent}">${esc('AREGUÁ, PARAGUAY')}</text>
  <text x="76" y="360" font-family="${display}" font-weight="800" font-size="96" letter-spacing="-3" fill="${C.ink}">Alan Alvarenga</text>
  <text x="80" y="418" font-family="${body}" font-weight="600" font-size="30" fill="${C.muted}">${esc('Desarrollador Full Stack · Supervisor de Sistemas en Producción')}</text>

  <g transform="translate(80 486)">
    <rect width="360" height="48" rx="24" fill="${C.ok}" fill-opacity=".12"/>
    <circle cx="28" cy="24" r="6" fill="${C.ok}"/>
    <text x="46" y="32" font-family="${body}" font-weight="700" font-size="22" fill="${C.ok}">Disponible para proyectos</text>
  </g>
</svg>`

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(path.join(PUBLIC, 'og-image.png'))
console.log('✓ public/og-image.png')

// Favicons PNG a partir de public/favicon.svg
const favicon = await readFile(path.join(PUBLIC, 'favicon.svg'))
for (const [file, size] of [
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-512.png', 512],
] as const) {
  await sharp(favicon, { density: 72 * (size / 32) * 2 })
    .resize(size, size)
    .png()
    .toFile(path.join(PUBLIC, file))
  console.log(`✓ public/${file}`)
}
