import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "./Header"
import HeroSection from "./HeroSection"
import Stats from "./Stats"
import HowItWorks from "./HowItWorks"
import Features from "./Features"
import GetStarted from "./GetStarted"

export default function IntroductionPage() {
  return (
    <div className="flex flex-col font-satoshi min-h-screen bg-white font-body">
      <Header />
      <main className="flex-1"> 
        <section className="my-4">
          <HeroSection />
        </section>

        <section className="p-7">
          <Stats/>
        </section>

        <section id="how-it-works">
          <HowItWorks />
        </section>

        <section id="features">
          <Features />
        </section>

        <section id="get-started">
          <GetStarted />
        </section>
      </main>
    </div>
  )
}