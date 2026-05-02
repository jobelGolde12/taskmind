'use client';

import {
  Navbar,
  Hero,
  ProcessFlow,
  QuickAnalyze,
  Features,
  UserTypes,
  HowItWorks,
  CallToAction,
  Footer
} from '@/components/home';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full gradient-bg">
      <Navbar />

      <main className="w-full pt-12">
        <section className="px-4 md:px-10 mb-12">
          <Hero />
        </section>
        
        <section className="px-4 md:px-10 mb-12">
          <ProcessFlow />
        </section>
        
        <section className="px-4 md:px-10 mb-12">
          <QuickAnalyze />
        </section>
        
        <section className="px-4 md:px-10 mb-12">
          <Features />
        </section>
        
        <section className="px-4 md:px-10 mb-12">
          <UserTypes />
        </section>
        
        <section className="px-4 md:px-10 mb-12">
          <HowItWorks />
        </section>
        
        <section className="px-4 md:px-10 mb-12">
          <CallToAction />
        </section>
      </main>

      <Footer />
    </div>
  );
}
