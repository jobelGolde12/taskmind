import { ArrowRight } from 'lucide-react';
import { processSteps } from '@/app/data/home';

export default function ProcessFlow() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Simple 3-Step Process</h3>
      <div className="flex flex-col md:flex-row justify-between items-center">
        {processSteps.map((step, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center w-full">
            <div className="flex flex-col items-center text-center mb-6 md:mb-0 w-full">
              <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mb-3`}>
                <step.icon className={`w-8 h-8 ${step.iconColor}`} />
              </div>
              <h4 className="font-medium text-gray-800">{step.title}</h4>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
            {index < processSteps.length - 1 && (
              <ArrowRight className="w-6 h-6 text-gray-400 mb-6 md:mb-0 hidden md:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
