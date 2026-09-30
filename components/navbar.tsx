'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Logo } from './logo'

const LINKS = [
  { label: 'PASLAUGOS', href: '/#paslaugos' },
  { label: 'TECHNOLOGIJOS', href: '/#technologijos' },
  { label: 'PROJEKTAI', href: '/#projektai' },
  { label: 'APIE MUS', href: '/#komanda' },
]

export function Navbar({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const scrolledRef = useRef(false)
  const light = variant === 'light'

  useEffect(() => {
    let ticking = false
    const updateScrolled = () => {
      ticking = false
      const nextScrolled = window.scrollY > 24
      if (scrolledRef.current === nextScrolled) return

      scrolledRef.current = nextScrolled
      setScrolled(nextScrolled)
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateScrolled)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-2 z-50">
      <div
        className={`mx-auto flex w-[calc(100%-2rem)] max-w-7xl items-center justify-between px-5 transition-all duration-300 md:px-8 ${
          scrolled
            ? light
              ? 'mt-0 rounded-2xl border border-[#0f0d0b]/10 bg-white/85 py-2 shadow-[0_8px_28px_rgba(15,13,11,0.08)] backdrop-blur-xl'
              : 'mt-0 rounded-2xl border border-white/10 bg-ink/70 py-2 backdrop-blur-xl'
            : 'mt-0 border-transparent bg-transparent py-3'
        }`}
      >
        <a href="/#top" aria-label="JUK Data — į viršų">
          <Logo />
        </a>

        <nav className="hidden items-center gap-10 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-[13px] font-semibold tracking-wider transition-colors ${
                light
                  ? 'text-[#0f0d0b]/75 hover:text-[#0f0d0b]'
                  : 'text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.65)] hover:text-white/75'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/#kontaktai"
            className="hidden items-center gap-2 rounded-xl bg-brand px-6 py-3 text-[13px] font-bold tracking-wider text-white transition-all hover:bg-brand-soft hover:shadow-[0_0_30px_-8px_rgba(251,98,2,0.7)] sm:inline-flex"
          >
            SUSISIEKITE <ArrowRight className="size-3.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Uždaryti meniu' : 'Atidaryti meniu'}
            aria-expanded={open}
            className={`inline-flex size-10 items-center justify-center rounded-xl backdrop-blur-sm lg:hidden ${
              light
                ? 'border border-[#0f0d0b]/15 bg-white/60 text-[#0f0d0b]'
                : 'border border-white/35 bg-black/10 text-white'
            }`}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className={`mx-4 mt-2 rounded-2xl p-4 backdrop-blur-xl lg:hidden ${
            light
              ? 'border border-[#0f0d0b]/10 bg-white/95 shadow-[0_8px_28px_rgba(15,13,11,0.08)]'
              : 'border border-white/10 bg-ink/95'
          }`}
        >
          <nav className="flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 text-sm font-semibold tracking-wide transition-colors ${
                  light
                    ? 'text-[#0f0d0b]/70 hover:bg-[#0f0d0b]/5 hover:text-[#0f0d0b]'
                    : 'text-foreground/80 hover:bg-white/5 hover:text-foreground'
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/#kontaktai"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold tracking-wide text-white"
            >
              SUSISIEKITE <ArrowRight className="size-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

