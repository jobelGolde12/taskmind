import { howItWorksSteps } from '@/app/data/home';

export default function HowItWorks() {
  return (
    <div id="how-it-works">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">How It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {howItWorksSteps.map((step) => (
          <div key={step.number} className="text-center">
            <div className={`w-16 h-16 rounded-full ${step.color} text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4`}>
              {step.number}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
