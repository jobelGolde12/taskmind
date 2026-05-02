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
    <div className="cozy-card p-6 interactive-hover flex flex-col md:flex-row md:items-center">
      <div className={`w-14 h-14 rounded-md ${color} flex items-center justify-center mb-4 md:mb-0 md:mr-5 shrink-0 border border-black/5 shadow-sm`}>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-foreground mb-1 font-sans">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
