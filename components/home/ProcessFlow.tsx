import { ArrowRight } from 'lucide-react';
import { processSteps } from '@/app/data/home';

export default function ProcessFlow() {
  return (
    <div className="cozy-card p-8 md:p-12">
      <h3 className="text-2xl font-bold text-foreground mb-10 text-center font-sans">Simple 3-Step Process</h3>
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-4">
        {processSteps.map((step, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center w-full">
            <div className="flex flex-col items-center text-center w-full group">
              <div className={`w-20 h-20 rounded-md ${step.color} flex items-center justify-center mb-5 shadow-sm border border-black/5 transition-transform group-hover:scale-110 duration-300`}>
                <step.icon className={`w-10 h-10 ${step.iconColor}`} />
              </div>
              <h4 className="font-bold text-foreground text-lg mb-2 font-sans">{step.title}</h4>
              <p className="text-muted-foreground text-sm max-w-[200px] leading-relaxed">{step.description}</p>
            </div>
            {index < processSteps.length - 1 && (
              <div className="hidden md:flex items-center justify-center w-12">
                <ArrowRight className="w-6 h-6 text-primary/20" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
