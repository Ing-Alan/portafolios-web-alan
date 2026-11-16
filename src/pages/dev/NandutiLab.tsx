/*
  PÁGINA TEMPORAL DE DESARROLLO — /dev/nanduti
  Solo existe con `npm run dev` (no entra en el build de producción).
  Se borra al final del proyecto. Por ser temporal, sus textos no viven en src/data.
*/
import { useRef, useState } from 'react'
import { Nanduti, type NandutiHandle } from '@/components/Nanduti'
import { ThemeToggle } from '@/components/ThemeToggle'
import type { RadiusMode } from '@/components/nanduti/geometry'

interface Params {
  cx: number
  cy: number
  radius: number
  opacity: number
  spokes: number
  rings: number
  radiusMode: RadiusMode
  duration: number
}

/** Parámetros exactos de las tres opciones de Referencia/vista-previa-inicio.html */
const PRESETS: Record<string, Params> = {
  'Opción 1 · Consola': { cx: 0.1, cy: 0.55, radius: 0.6, opacity: 0.2, spokes: 40, rings: 7, radiusMode: 'min', duration: 2600 },
  'Opción 2 · Plano': { cx: 0.55, cy: 0.5, radius: 0.44, opacity: 0.75, spokes: 32, rings: 6, radiusMode: 'min', duration: 2200 },
  'Opción 3 · Barra de estado': { cx: 1, cy: 0.42, radius: 0.5, opacity: 0.38, spokes: 48, rings: 8, radiusMode: 'width', duration: 3000 },
}

type NumKey = Exclude<keyof Params, 'radiusMode'>
const SLIDERS: { key: NumKey; label: string; min: number; max: number; step: number }[] = [
  { key: 'cx', label: 'Centro X', min: -0.5, max: 1.5, step: 0.01 },
  { key: 'cy', label: 'Centro Y', min: -0.5, max: 1.5, step: 0.01 },
  { key: 'radius', label: 'Radio', min: 0.1, max: 1.5, step: 0.01 },
  { key: 'opacity', label: 'Opacidad', min: 0.05, max: 1, step: 0.01 },
  { key: 'spokes', label: 'Rayos', min: 8, max: 96, step: 1 },
  { key: 'rings', label: 'Anillos', min: 1, max: 14, step: 1 },
  { key: 'duration', label: 'Duración (ms)', min: 300, max: 6000, step: 100 },
]

const DEFAULT = PRESETS['Opción 1 · Consola'] as Params

export default function NandutiLab() {
  const [p, setP] = useState<Params>(DEFAULT)
  const [weaveOnMount, setWeaveOnMount] = useState(true)
  const [showText, setShowText] = useState(true)
  const [mountKey, setMountKey] = useState(0)
  const ref = useRef<NandutiHandle>(null)

  const set = <K extends keyof Params>(k: K, v: Params[K]) => setP((prev) => ({ ...prev, [k]: v }))

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 lg:px-10">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-warn">
        Página temporal de desarrollo · se borra al final
      </p>
      <h1 className="mt-2 text-[clamp(1.6rem,3.2vw,2.2rem)] font-bold">Laboratorio del ñandutí</h1>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {Object.entries(PRESETS).map(([name, preset]) => (
          <button
            key={name}
            type="button"
            onClick={() => {
              setP(preset)
              setMountKey((k) => k + 1)
            }}
            className="cursor-pointer rounded-lg border border-rule bg-surface px-3 py-1.5 text-[12.5px] font-semibold"
          >
            {name}
          </button>
        ))}
        <ThemeToggle className="ml-auto" />
      </div>

      {/* Vista previa: mismo marco y fondo que el hero de la vista previa */}
      <div className="relative mt-5 h-[clamp(320px,55vw,500px)] overflow-hidden rounded-[14px] border border-rule bg-hero shadow-[0_30px_60px_-40px_rgba(5,20,45,.45)]">
        <Nanduti key={mountKey} ref={ref} weaveOnMount={weaveOnMount} {...p} />
        {showText && (
          <div className="relative flex h-full flex-col justify-center px-[clamp(18px,4vw,40px)]">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-accent">Areguá, Paraguay</span>
            <p className="mb-3.5 mt-3.5 font-display text-[clamp(2.3rem,5.6vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
              Alan Alvarenga
            </p>
            <p className="m-0 font-semibold text-muted">Desarrollador Full Stack · Supervisor de Sistemas en Producción</p>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-x-8 gap-y-4 rounded-[14px] border border-rule bg-surface p-5 sm:grid-cols-2">
        {SLIDERS.map((s) => (
          <label key={s.key} className="flex flex-col gap-1.5 text-[13px] font-semibold">
            <span className="flex justify-between">
              {s.label}
              <output className="font-mono text-muted">{p[s.key]}</output>
            </span>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={p[s.key]}
              onChange={(e) => set(s.key, Number(e.target.value))}
              className="accent-[var(--accent)]"
            />
          </label>
        ))}

        <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
          Modo de radio
          <select
            value={p.radiusMode}
            onChange={(e) => set('radiusMode', e.target.value === 'width' ? 'width' : 'min')}
            className="rounded-lg border border-rule bg-surface-2 px-2 py-1.5 font-mono text-[12.5px]"
          >
            <option value="min">min — lado menor</option>
            <option value="width">width — ancho (sale por el borde)</option>
          </select>
        </label>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-semibold sm:col-span-2">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={weaveOnMount} onChange={(e) => setWeaveOnMount(e.target.checked)} />
            Tejer al montar
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={showText} onChange={(e) => setShowText(e.target.checked)} />
            Mostrar texto encima
          </label>
          <button
            type="button"
            onClick={() => setMountKey((k) => k + 1)}
            className="cursor-pointer rounded-lg border border-rule bg-surface px-3 py-1.5"
          >
            Remontar
          </button>
          <button
            type="button"
            onClick={() => ref.current?.replay()}
            className="ml-auto cursor-pointer rounded-[10px] bg-accent px-4 py-2 font-bold text-accent-ink"
          >
            Repetir animación
          </button>
        </div>
      </div>

      <pre className="mt-6 overflow-x-auto rounded-[10px] border border-rule bg-surface-2 p-3.5 font-mono text-[12.5px]">
        {`<Nanduti cx={${p.cx}} cy={${p.cy}} radius={${p.radius}} opacity={${p.opacity}} spokes={${p.spokes}} rings={${p.rings}} radiusMode="${p.radiusMode}" duration={${p.duration}} />`}
      </pre>
    </div>
  )
}
