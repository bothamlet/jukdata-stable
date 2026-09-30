import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Technologies } from '@/components/technologies'
import { Projects } from '@/components/projects'
import { Team } from '@/components/team'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { AnchorNavigation } from '@/components/anchor-navigation'

export default function Page() {
  return (
    <main className="min-h-screen bg-ink">
      <AnchorNavigation />
      <Navbar />
      <Hero />
      <Services />
      <Technologies />
      <Projects />
      <Team />
      <Contact />
      <Footer />
    </main>
  )
}
