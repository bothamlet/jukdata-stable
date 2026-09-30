'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Mail, CalendarCheck, Phone } from 'lucide-react'
import { LinkedinIcon } from './icons'

// Set NEXT_PUBLIC_FORMSPREE_ENDPOINT to the form's real endpoint to enable
// submissions. The value is public in the rendered page either way, so this is
// about not shipping the owner's live form id in the repository, not secrecy.
const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ??
  'https://formspree.io/f/your-form-id'

export function Contact() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const form = e.currentTarget

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Formspree submission failed')
      }

      form.reset()
      setSent(true)
    } catch {
      setError(
        'Nepavyko išsiųsti žinutės. Bandykite dar kartą arba parašykite el. paštu.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="kontaktai" className="section-pad bg-ink">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: statement + details */}
          <div>
            <h2 className="text-balance text-5xl font-extrabold leading-[1.02] tracking-tight text-foreground sm:text-6xl">
              Pradėkime pokalbį
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground/60">
              Turite klausimų ar projektą? Parašykite mums — atsakysime per vieną
              darbo dieną.
            </p>

            <div className="mt-10 space-y-3">
              <a
                href="mailto:info@example.com"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-brand/40"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Mail className="size-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold tracking-widest text-brand">
                    EL. PAŠTAS
                  </span>
                  <span className="text-foreground">info@example.com</span>
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-brand/40"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <LinkedinIcon className="size-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold tracking-widest text-brand">
                    LINKEDIN
                  </span>
                  <span className="text-foreground">JUK Data</span>
                </span>
              </a>
              <a
                href="tel:+37060000xxx"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-brand/40"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Phone className="size-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold tracking-widest text-brand">
                    TELEFONAS
                  </span>
                  {/* Plus Jakarta Sans' calt swaps in a miniature "x" after a digit; off for the placeholder. */}
                  <span
                    className="text-foreground"
                    style={{ fontFeatureSettings: '"calt" 0' }}
                  >
                    +370 600 00xxx
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
            {sent ? (
              <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-brand/15 text-brand">
                  <CalendarCheck className="size-7" />
                </span>
                <h3 className="mt-6 text-2xl font-bold text-foreground">
                  Ačiū už žinutę!
                </h3>
                <p className="mt-2 text-foreground/60">
                  Susisieksime su jumis artimiausiu metu.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                action={FORMSPREE_ENDPOINT}
                method="POST"
                className="flex flex-col gap-4"
              >
                <Field
                  label="Vardas"
                  name="name"
                  placeholder="Vardas"
                  autoComplete="name"
                />
                <Field
                  label="El. paštas"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="El. paštas"
                />
                <div>
                  <label htmlFor="message" className="sr-only">
                    Jūsų žinutė
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Jūsų žinutė"
                    className="w-full resize-none rounded-xl border border-white/10 bg-ink-soft px-5 py-4 text-foreground placeholder:text-foreground/35 outline-none transition-colors focus:border-brand"
                  />
                </div>
                {error && (
                  <p className="rounded-xl border border-brand/30 bg-brand/10 px-4 py-3 text-sm leading-relaxed text-foreground">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-7 py-4 text-sm font-bold tracking-wide text-white transition-all hover:bg-brand-soft hover:shadow-[0_0_40px_-8px_rgba(251,98,2,0.8)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  SIŲSTI ŽINUTĘ <ArrowRight className="size-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  placeholder: string
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-white/10 bg-ink-soft px-5 py-4 text-foreground placeholder:text-foreground/35 outline-none transition-colors focus:border-brand"
      />
    </div>
  )
}
