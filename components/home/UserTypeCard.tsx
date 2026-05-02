import { LucideIcon, Check } from 'lucide-react';

interface UserTypeCardProps {
  icon: LucideIcon;
  title: string;
  items: string[];
  color: string;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  checkColor: string;
}

export default function UserTypeCard({ 
  icon: Icon, 
  title, 
  items, 
  color, 
  iconColor, 
  checkColor 
}: UserTypeCardProps) {
  return (
    <div className="cozy-card p-6 interactive-hover flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-14 h-14 rounded-md ${color} flex items-center justify-center border border-black/5 shadow-sm`}>
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
        <h3 className="text-xl font-bold text-foreground font-sans">{title}</h3>
      </div>
      <ul className="space-y-3 flex-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={`mt-1 rounded-full p-0.5 bg-success/10`}>
              <Check className={`w-3.5 h-3.5 text-success`} />
            </div>
            <span className="text-muted-foreground text-sm font-normal">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
