import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Nanduti } from '@/components/Nanduti'
import { profile } from '@/data/profile'
import { hero } from '@/data/sections'
import type { HeroPanelRow } from '@/data/types'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useCountUp } from '@/hooks/useCountUp'
import { useTypewriter } from '@/hooks/useTypewriter'

/* Tiempos de la secuencia de entrada (ms desde el montaje) */
const T = { text: 350, panel: 900, counters: 1100, terminal: 1500 }

const ease = [0.22, 1, 0.36, 1] as const

const textGroup: Variants = {
  hidden: {},
  show: { transition: { delayChildren: T.text / 1000, staggerChildren: 0.12 } },
}
const textItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

function useAfter(ms: number, instant: boolean): boolean {
  const [ready, setReady] = useState(instant)
  useEffect(() => {
    if (instant) {
      setReady(true)
      return
    }
    const id = window.setTimeout(() => setReady(true), ms)
    return () => window.clearTimeout(id)
  }, [ms, instant])
  return ready
}

function Counter({ value, start, instant }: { value: number; start: boolean; instant: boolean }) {
  const n = useCountUp(value, start, instant)
  return (
    <span className="font-display text-[22px] font-bold tabular-nums">
      <span aria-hidden="true">{n}</span>
      <span className="sr-only">{value}</span>
    </span>
  )
}

function PanelRow({ row, start, instant }: { row: HeroPanelRow; start: boolean; instant: boolean }) {
  return (
    <div className="flex items-center gap-3 border-b border-dashed border-rule py-[11px] text-[13.5px] last:border-b-0">
      <dt className="font-mono text-xs font-medium text-muted">{row.key}</dt>
      <dd className="m-0 ml-auto flex items-center gap-2 text-right font-bold">
        {row.kind === 'pill' && <span className="pill">{row.value}</span>}
        {row.kind === 'count' && typeof row.value === 'number' && (
          <Counter value={row.value} start={start} instant={instant} />
        )}
        {row.kind === 'mono' && <span className="font-mono text-[12.5px]">{row.value}</span>}
      </dd>
    </div>
  )
}

function Terminal({ start, instant }: { start: boolean; instant: boolean }) {
  const { command, result } = profile.heroPanel.terminal
  const { a, b } = useTypewriter(command, result, start, instant)
  return (
    <div className="term mx-4 mb-4 mt-1">
      <span className="sr-only">
        {hero.terminalLabel}: $ {command} — {result}
      </span>
      {/* Capa invisible con el texto completo: reserva el alto final y evita saltos */}
      <div aria-hidden="true" className="grid">
        <span className="invisible col-start-1 row-start-1">
          $ {command}
          <br />
          {result} <span className="caret" />
        </span>
        <span className="col-start-1 row-start-1">
          <span className="text-accent">$</span> {a}
          <br />
          <span className="text-ok">{b}</span> <span className="caret" />
        </span>
      </div>
    </div>
  )
}

/** La secuencia de entrada se reproduce una sola vez por visita (no al volver desde un proyecto). */
let introPlayed = false

export function Hero() {
  const prefersReduced = useReducedMotion() ?? false
  const [skipIntro] = useState(() => introPlayed)
  useEffect(() => {
    introPlayed = true
  }, [])
  const reduce = prefersReduced || skipIntro
  const mobile = useMediaQuery('(max-width: 820px)')
  const countersOn = useAfter(T.counters, reduce)
  const terminalOn = useAfter(T.terminal, reduce)
  const p = profile.heroPanel

  // En celular: ñandutí más chico y tenue, arriba a la izquierda, para no tapar el texto
  const nd = mobile
    ? { cx: 0.08, cy: 0.2, radius: 0.55, opacity: 0.12 }
    : { cx: 0.1, cy: 0.55, radius: 0.6, opacity: 0.2 }

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden border-b border-rule bg-hero">
      <Nanduti {...nd} spokes={40} rings={7} duration={2600} weaveOnMount={!skipIntro} />

      <div className="container-x relative grid items-center gap-[clamp(28px,4vw,56px)] pb-[clamp(40px,6vw,80px)] pt-[clamp(32px,5vw,72px)] nav:grid-cols-[1.1fr_.9fr]">
        <motion.div variants={textGroup} initial={reduce ? false : 'hidden'} animate="show">
          <motion.p variants={textItem} className="eyebrow m-0">
            {profile.location}
          </motion.p>
          <motion.h1
            id="hero-title"
            variants={textItem}
            className="my-3.5 text-[clamp(2.3rem,5.6vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.035em]"
          >
            {profile.name}
          </motion.h1>
          <motion.p variants={textItem} className="m-0 mb-1.5 font-semibold text-muted">
            {profile.role}
          </motion.p>
          <motion.p variants={textItem} className="m-0 mb-[26px] max-w-[46ch] text-[1.02rem]">
            {profile.lede}
          </motion.p>
          <motion.div variants={textItem} className="flex flex-wrap gap-2.5">
            <Link to={{ pathname: '/', hash: '#proyectos' }} className="btn btn-pri">
              {hero.ctaProjects}
            </Link>
            <Link to={{ pathname: '/', hash: '#contacto' }} className="btn btn-sec">
              {hero.ctaContact}
            </Link>
          </motion.div>
        </motion.div>

        <motion.aside
          aria-label={hero.panelLabel}
          className="panel"
          initial={reduce ? false : { opacity: 0, x: mobile ? 0 : 24, y: mobile ? 16 : 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, ease, delay: T.panel / 1000 }}
        >
          <div className="panel-head">
            <b>{p.title}</b> · {p.subtitle}
            <span className="ml-auto inline-flex items-center gap-[7px] font-bold text-ok">
              <span className="dot" aria-hidden="true" />
              {p.liveLabel}
            </span>
          </div>
          <dl className="m-0 px-4 py-1.5">
            {p.rows.map((row) => (
              <PanelRow key={row.key} row={row} start={countersOn} instant={reduce} />
            ))}
          </dl>
          <Terminal start={terminalOn} instant={reduce} />
        </motion.aside>
      </div>
    </section>
  )
}
