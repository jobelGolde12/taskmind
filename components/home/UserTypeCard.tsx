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
  bgColor, 
  borderColor, 
  checkColor 
}: UserTypeCardProps) {
  return (
    <div className={`bg-gradient-to-br ${bgColor} to-white rounded-2xl shadow-lg p-6 border ${borderColor}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center`}>
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className={`w-5 h-5 ${checkColor}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
