import { User } from 'lucide-react'

const TEAM = [
  { name: 'Jonas Jonaitis', role: 'Generalinis direktorius' },
  { name: 'Petras Petraitis', role: 'Vykdantysis direktorius' },
  { name: 'Ona Onaitė', role: 'Finansų direktorė' },
]

export function Team() {
  return (
    <section id="komanda" className="section-pad bg-[#f5f3f0]">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-[#111009] sm:text-5xl">
            Mūsų komanda
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#0f0d0b]/60">
            Maža, bet stipri duomenų specialistų komanda. Padedame verslams
            priimti geresnius sprendimus pasitelkiant duomenų analizę, dirbtinį
            intelektą ir procesų automatizavimą.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TEAM.map((m) => (
            <article
              key={m.name}
              className="group rounded-xl border border-[#0f0d0b]/[0.08] bg-[#f0ece7] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:bg-brand/10 hover:shadow-[0_8px_22px_rgba(251,98,2,0.1)]"
            >
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand to-brand-muted">
                <User className="size-24 text-white/85" strokeWidth={1.4} />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#111009]">
                {m.name}
              </h3>
              <p className="mt-1 text-[#0f0d0b]/55">{m.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
