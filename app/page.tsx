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

      <main>
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <Hero />
            <ProcessFlow />
          </div>
          
          <QuickAnalyze />
          <Features />
          <UserTypes />
          <HowItWorks />
          <CallToAction />
        </div>
      </main>

      <Footer />
    </div>
  );
}
