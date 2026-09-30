import { ZoomIn, MonitorSmartphone, LineChart, Users } from 'lucide-react'

const SERVICES = [
  {
    title: 'Procesų auditas',
    desc: 'Išsamus verslo procesų auditas ir konkrečios efektyvumo rekomendacijos.',
    Icon: ZoomIn,
  },
  {
    title: 'Skaitmenizavimas',
    desc: 'Programinė įranga, kuri pakeičia popierių ir rankinį darbą skaitmeniniais sprendimais.',
    Icon: MonitorSmartphone,
  },
  {
    title: 'Duomenų analitika',
    desc: 'Power BI ataskaitos ir duomenų įžvalgos, padedančios priimti geresnius sprendimus.',
    Icon: LineChart,
  },
  {
    title: 'Palaikymas ir mokymai',
    desc: 'Sistemų palaikymas, darbuotojų mokymai ir kasdienės konsultacijos.',
    Icon: Users,
  },
]

export function Services() {
  return (
    <section id="paslaugos" className="section-pad bg-ink">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Paslaugos, kurias teikiame
          </h2>
          <p className="mt-5 text-lg text-foreground/60">
            Nuo proceso audito iki įdiegimo ir palaikymo — visas ciklas vienoje
            vietoje.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group relative min-h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:bg-white/[0.05] md:p-10"
            >
              <div className="flex justify-start">
                <span className="flex size-20 items-center justify-center rounded-2xl bg-brand/15 text-brand transition-colors group-hover:bg-brand/20">
                  <s.Icon className="size-10" strokeWidth={1.8} />
                </span>
              </div>
              <h3 className="mt-12 text-2xl font-bold text-foreground">
                {s.title}
              </h3>
              <p className="mt-4 max-w-sm leading-relaxed text-foreground/55">
                {s.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
