import { howItWorksSteps } from '@/app/data/home';

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="cozy-card p-10 md:p-16">
      <h2 className="text-[2.5rem] font-bold text-foreground text-center mb-12 font-sans">How It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {howItWorksSteps.map((step) => (
          <div key={step.number} className="text-center group">
            <div className={`w-20 h-20 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-md transition-transform group-hover:scale-110`}>
              {step.number}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3 font-sans">{step.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
