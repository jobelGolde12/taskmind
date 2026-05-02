import FeatureCard from './FeatureCard';
import { features } from '@/app/data/home';

export default function Features() {
  return (
    <div id="features">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Unique Features</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}
