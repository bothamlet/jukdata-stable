const TECHNOLOGIES = [
  { name: 'Power BI', icon: '/icons/powerbi.svg', color: '#f2c811' },
  { name: 'Azure DevOps', icon: '/icons/azuredevops.svg', color: '#0078d7' },
  { name: 'Microsoft 365', icon: '/icons/microsoftoffice.svg', color: '#d83b01' },
  { name: 'Microsoft Azure', icon: '/icons/microsoftazure.svg', color: '#0078d4' },
  { name: 'Docker', icon: '/icons/docker.svg', color: '#2496ed' },
  { name: 'Kubernetes', icon: '/icons/kubernetes.svg', color: '#326ce5' },
  { name: 'Apache Airflow', icon: '/icons/apacheairflow.svg', color: '#017cee' },
  { name: 'Apache Kafka', icon: '/icons/apachekafka.svg', color: '#231f20' },
  { name: 'PostgreSQL', icon: '/icons/postgresql.svg', color: '#336791' },
  { name: 'MariaDB', icon: '/icons/mariadb.svg', color: '#c0765a' },
  { name: 'Python', icon: '/icons/python.svg', color: '#3776ab' },
  { name: 'Jupyter', icon: '/icons/jupyter.svg', color: '#f37626' },
  { name: 'OpenAI', icon: '/icons/openai.svg', color: '#10a37f' },
  { name: 'Anthropic', icon: '/icons/anthropic.svg', color: '#d97757' },
]

function TechnologyItem({
  name,
  icon,
  color,
  hidden = false,
}: {
  name: string
  icon: string
  color: string
  hidden?: boolean
}) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="group flex min-w-[120px] shrink-0 flex-col items-center justify-center gap-1 rounded-lg border border-[#0f0d0b]/[0.06] bg-[#f0ece7] px-3 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-brand/35 hover:bg-brand/10 hover:shadow-[0_3px_8px_rgba(251,98,2,0.1)]"
    >
      <span
        className="size-9 opacity-80 transition-opacity group-hover:opacity-100"
        style={{
          backgroundColor: color,
          WebkitMaskImage: `url(${icon})`,
          maskImage: `url(${icon})`,
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
        }}
      />
      <span className="whitespace-nowrap text-[10px] font-semibold text-[#0f0d0b]/60">
        {name}
      </span>
    </div>
  )
}

export function Technologies() {
  return (
    <section
      id="technologijos"
      className="relative overflow-hidden bg-[#f5f3f0] py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(251,98,2,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(251,98,2,0.05),transparent_45%)]" />

      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <h2 className="text-3xl font-semibold leading-tight text-[#111009] sm:text-[40px]">
          Technologijos, su kuriomis dirbame
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-[#0f0d0b]/55">
          Pasirenkame įrankius, kurie geriausiai atitinka jūsų verslo poreikius.
        </p>
      </div>

      <div className="marquee-mask relative mt-6 overflow-x-hidden overflow-y-visible px-4 py-2">
        <div className="tech-logo-track flex w-max gap-4 pr-4">
          {TECHNOLOGIES.map((technology) => (
            <TechnologyItem key={technology.name} {...technology} />
          ))}
          {TECHNOLOGIES.map((technology) => (
            <TechnologyItem
              key={`${technology.name}-duplicate`}
              {...technology}
              hidden
            />
          ))}
        </div>
      </div>
    </section>
  )
}
