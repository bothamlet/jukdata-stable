'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'

const PROJECTS = [
  {
    tag: 'DUOMENŲ PLATFORMA',
    title: 'Gamybos Valdymo Centras',
    desc: 'Gamybos įmonei sukūrėme sistemą, kuri pakeitė Excel failus ir leido matyti užsakymų eigą realiu laiku.',
    points: [
      'Suvestinė su pagrindiniais KPI rodikliais',
      'Užsakymų valdymas ir terminų kontrolė',
      'Broko registras su istorija ir analize',
      'Darbuotojų apkrovimo peržiūra',
    ],
  },
  {
    tag: 'VERSLO ŽVALGYBA',
    title: 'Analitikos ir valdymo skydai',
    desc: 'Paruošėme valdymo skydus, kurie sujungia svarbiausius rodiklius į aiškų, vadovams ir komandai patogų vaizdą.',
    points: [
      'Aiškūs veiklos rodiklių ekranai',
      'Filtrai skirtingiems padaliniams ir laikotarpiams',
      'Vizualiai suprantamos tendencijos',
      'Patogus duomenų peržiūrėjimas komandoje',
    ],
  },
]

export function Projects() {
  const [active, setActive] = useState(0)
  const p = PROJECTS[active]

  return (
    <section id="projektai" className="section-pad bg-ink">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Mūsų darbai
          </h2>
          <p className="mt-5 text-lg text-foreground/60">
            Keletas projektų, kuriuos įgyvendinome savo klientams.
          </p>
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-8 lg:p-10">
          <div className="mb-10 grid gap-3 sm:grid-cols-2">
            {PROJECTS.map((proj, i) => (
              <button
                key={proj.title}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Rodyti projektą: ${proj.title}`}
                aria-current={i === active}
                className={`group rounded-xl border p-4 text-left transition-all duration-300 ${
                  i === active
                    ? 'border-brand bg-brand text-ink'
                    : 'border-white/10 bg-white/[0.04] text-foreground hover:border-brand/50 hover:bg-white/[0.08]'
                }`}
              >
                <span
                  className={`text-[0.65rem] font-bold tracking-[0.18em] ${
                    i === active ? 'text-ink/65' : 'text-brand'
                  }`}
                >
                  {proj.tag}
                </span>
                <span className="mt-2 block text-lg font-extrabold tracking-tight">
                  {proj.title}
                </span>
              </button>
            ))}
          </div>

          <div className="grid items-center gap-10">
            <div className="max-w-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="text-xs font-bold tracking-[0.2em] text-brand">
                    {p.tag}
                  </span>
                  <h3 className="mt-4 text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
                    {p.title}
                  </h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-foreground/60">
                    {p.desc}
                  </p>
                  <ul className="mt-8 space-y-3">
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-center gap-3 text-foreground/80"
                      >
                        <span className="flex size-5 items-center justify-center rounded-full bg-brand/15 text-brand">
                          <Check className="size-3" />
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/#kontaktai"
                    className="mt-9 inline-flex items-center gap-2 text-sm font-bold tracking-wide text-brand transition-colors hover:text-brand-soft"
                  >
                    APTARTI PANAŠŲ PROJEKTĄ <ArrowRight className="size-4" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden">
            {PROJECTS.map((proj, i) => (
              <button
                key={proj.title}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Rodyti projektą: ${proj.title}`}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? 'w-8 bg-brand'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
