'use client';

import { motion } from 'framer-motion';
import { Flame, AlertTriangle, AlertCircle, Info, LucideIcon } from 'lucide-react';

type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

interface UrgencyBadgeProps {
  level: UrgencyLevel;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const urgencyConfig: Record<UrgencyLevel, { color: string; icon: LucideIcon; label: string }> = {
  low: {
    color: 'bg-primary/10 border-primary/20 text-primary',
    icon: Info,
    label: 'Low',
  },
  medium: {
    color: 'bg-warning/10 border-warning/20 text-warning',
    icon: AlertCircle,
    label: 'Medium',
  },
  high: {
    color: 'bg-warning/20 border-warning/30 text-warning',
    icon: AlertTriangle,
    label: 'High',
  },
  critical: {
    color: 'bg-danger/10 border-danger/20 text-danger',
    icon: Flame,
    label: 'Critical',
  },
};

export function UrgencyBadge({
  level = 'medium',
  score,
  size = 'md',
  showLabel = true,
}: UrgencyBadgeProps) {
  const config = urgencyConfig[level];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1.5 rounded-md border font-bold uppercase tracking-wider ${config.color} ${sizeClasses[size]}`}
    >
      <Icon className="h-3 w-3" />
      {showLabel && <span>{config.label}</span>}
      {score !== undefined && size !== 'sm' && (
        <span className="opacity-70">({score})</span>
      )}
    </motion.div>
  );
}

interface UrgencyMeterProps {
  score: number;
  showLabel?: boolean;
}

export function UrgencyMeter({ score, showLabel = true }: UrgencyMeterProps) {
  const normalizedScore = Math.max(0, Math.min(100, score));
  
  const getColor = (s: number) => {
    if (s >= 90) return 'bg-danger';
    if (s >= 70) return 'bg-warning';
    if (s >= 40) return 'bg-warning/60';
    return 'bg-primary';
  };

  const getLevel = (s: number): UrgencyLevel => {
    if (s >= 90) return 'critical';
    if (s >= 70) return 'high';
    if (s >= 40) return 'medium';
    return 'low';
  };

  return (
    <div className="w-full space-y-2">
      {showLabel && (
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
          <span className="text-muted-foreground">Urgency Level</span>
          <span className="text-primary">{urgencyConfig[getLevel(normalizedScore)].label}</span>
        </div>
      )}
      
      <div className="relative h-2.5 overflow-hidden rounded-md bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${normalizedScore}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`absolute inset-y-0 left-0 ${getColor(normalizedScore)}`}
        />
      </div>
      
      {showLabel && (
        <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <span>Min</span>
          <span>Score: {normalizedScore}</span>
          <span>Max</span>
        </div>
      )}
    </div>
  );
}
