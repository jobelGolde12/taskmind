import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  iconColor: string;
}

export default function FeatureCard({ icon: Icon, title, description, color, iconColor }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 action-card sm:flex sm:justify-center sm:items-center">
      <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-4 sm:mb-0 sm:mr-4`}>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
