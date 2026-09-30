import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'

const UPDATED_AT = '2026-07-04'

export const metadata: Metadata = {
  title: 'Privatumo politika | JUK Data',
  description: 'JUK Data privatumo politikos puslapis.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#242424]">
      <Navbar variant="light" />

      <header className="border-b border-[#dedbd5] bg-[#fbfbfa] px-5 pb-28 pt-36 text-center md:px-8 md:pb-32 md:pt-44">
        <h1 className="text-balance text-6xl font-extrabold leading-none tracking-tight text-black sm:text-7xl md:text-8xl">
          Privatumo politika
        </h1>
        <p className="mt-10 text-2xl font-semibold tracking-tight text-[#2e2e2e] md:text-3xl">
          {UPDATED_AT}
        </p>
      </header>
    </main>
  )
}
