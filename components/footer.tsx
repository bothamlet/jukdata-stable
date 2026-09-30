import { Logo } from './logo'
import { LinkedinIcon } from './icons'

const LINKS = [
  { label: 'Paslaugos', href: '/#paslaugos' },
  { label: 'Technologijos', href: '/#technologijos' },
  { label: 'Komanda', href: '/#komanda' },
  { label: 'Kontaktai', href: '/#kontaktai' },
  { label: 'Privatumo politika', href: '/privatumo-politika' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm leading-relaxed text-foreground/55">
              Paverčiame duomenis į sprendimus. Verslo žvalgyba, duomenų
              platformos, DI sprendimai ir automatizavimas mažoms ir vidutinėms
              įmonėms.
            </p>
          </div>

          <div className="text-left">
            <h3 className="text-xs font-bold tracking-widest text-brand">
              NUORODOS
            </h3>
            <ul className="mt-5 space-y-3">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-foreground/60 transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left">
            <h3 className="text-xs font-bold tracking-widest text-brand">
              KONTAKTAI
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:info@example.com"
                  className="text-foreground/60 transition-colors hover:text-foreground"
                >
                  info@example.com
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground"
                >
                  <LinkedinIcon className="size-4" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-sm text-foreground/40">
            © 2026 JUK Data. Visos teisės saugomos.
          </p>
          <a
            href="#"
            aria-label="JUK Data LinkedIn"
            className="flex size-9 items-center justify-center rounded-lg text-brand transition-colors hover:bg-white/5"
          >
            <LinkedinIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
