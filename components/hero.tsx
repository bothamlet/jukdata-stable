'use client'

import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { HeroCanvas } from './hero-canvas'

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#f5f3ef]"
    >
      <div className="pointer-events-none absolute inset-0 z-30 rounded-[28px] border-[9px] border-[#f5f3ef]" />
      <HeroCanvas />
      <div className="pointer-events-none absolute inset-[9px] bg-gradient-to-b from-black/10 via-transparent to-black/25" />

      <div className="relative z-10 flex min-h-[100svh] w-full flex-col justify-end px-8 pb-10 sm:px-11 sm:pb-11">
        <div className="pointer-events-none absolute inset-x-8 top-[43%] -translate-y-1/2 sm:inset-x-11 sm:top-1/2 sm:-translate-y-[58%]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[12ch] text-left text-5xl font-medium leading-none text-white [text-shadow:0_2px_60px_rgba(0,0,0,0.25)] sm:text-7xl lg:max-w-none lg:whitespace-nowrap lg:text-[clamp(3.65rem,5.6vw,5.75rem)]"
          >
            Išmanūs duomenų sprendimai
            <br />
            kasdieniam verslui.
          </motion.h1>
        </div>

        <div className="flex justify-start lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#kontaktai"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-[11px] font-semibold uppercase text-white transition-colors hover:bg-brand-soft"
            >
              Rezervuoti susitikimą <ArrowRight className="size-4" />
            </a>
            <a
              href="#paslaugos"
              className="inline-flex items-center rounded-full border border-brand bg-brand/15 px-7 py-4 text-[11px] font-semibold uppercase text-white backdrop-blur-sm transition-colors hover:bg-brand/30"
            >
              Mūsų paslaugos
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
