// Convierte las capturas de Referencia/portafolio-imagenes/ a WebP
// (ancho máximo 1600px + variante -sm de 800px para srcset)
// y las guarda en src/assets/projects/<slug>/.
// Uso: npm run images
import { mkdir, readdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC_DIR = path.join(root, 'Referencia', 'portafolio-imagenes')
const OUT_DIR = path.join(root, 'src', 'assets', 'projects')
const MAX_WIDTH = 1600
const QUALITY = 82
const SMALL_WIDTH = 800
const SMALL_SUFFIX = '-sm'

/** carpeta de origen → slug del proyecto */
const SLUGS = {
  'sistema-odontologico': 'sistema-odontologico',
  'sistema-parroquial': 'sistema-parroquial',
  'sistema-vacaciones-permisos': 'vacaciones-y-permisos',
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`.padStart(8)

if (!existsSync(SRC_DIR)) {
  console.error(`No existe la carpeta de origen: ${SRC_DIR}`)
  process.exit(1)
}

let totalIn = 0
let totalOut = 0
let count = 0

for (const [srcFolder, slug] of Object.entries(SLUGS)) {
  const inDir = path.join(SRC_DIR, srcFolder)
  if (!existsSync(inDir)) {
    console.warn(`⚠ Falta la carpeta ${srcFolder}, se omite.`)
    continue
  }
  const outDir = path.join(OUT_DIR, slug)
  await mkdir(outDir, { recursive: true })

  const files = (await readdir(inDir)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort()
  for (const file of files) {
    const input = path.join(inDir, file)
    const output = path.join(outDir, `${path.parse(file).name}.webp`)
    const info = await sharp(input)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6, smartSubsample: true })
      .toFile(output)
    // Variante chica para srcset (tarjetas y pantallas angostas)
    const small = path.join(outDir, `${path.parse(file).name}${SMALL_SUFFIX}.webp`)
    const infoSm = await sharp(input)
      .resize({ width: SMALL_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6, smartSubsample: true })
      .toFile(small)
    const inSize = (await stat(input)).size
    totalIn += inSize
    totalOut += info.size + infoSm.size
    count++
    console.log(
      `${kb(inSize)} → ${kb(info.size)} + ${kb(infoSm.size)}  ${info.width}×${info.height}  ${slug}/${path.basename(output)}`,
    )
  }
}

console.log(`\n✓ ${count} imágenes · ${kb(totalIn).trim()} → ${kb(totalOut).trim()}`)
