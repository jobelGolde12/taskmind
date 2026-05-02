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
    color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300',
    icon: Info,
    label: 'Low',
  },
  medium: {
    color: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-300',
    icon: AlertCircle,
    label: 'Medium',
  },
  high: {
    color: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-300',
    icon: AlertTriangle,
    label: 'High',
  },
  critical: {
    color: 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-300',
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
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1.5 rounded-full border backdrop-blur-sm ${config.color} ${sizeClasses[size]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {showLabel && <span className="font-medium">{config.label}</span>}
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
    if (s >= 90) return 'from-red-500 to-red-600';
    if (s >= 70) return 'from-orange-500 to-orange-600';
    if (s >= 40) return 'from-yellow-500 to-yellow-600';
    return 'from-blue-500 to-blue-600';
  };

  const getLevel = (s: number): UrgencyLevel => {
    if (s >= 90) return 'critical';
    if (s >= 70) return 'high';
    if (s >= 40) return 'medium';
    return 'low';
  };

  return (
    <div className="w-full space-y-1.5">
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Urgency</span>
          <span className="font-medium">{urgencyConfig[getLevel(normalizedScore)].label}</span>
        </div>
      )}
      
      <div className="relative h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${normalizedScore}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getColor(normalizedScore)}`}
        />
      </div>
      
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>{normalizedScore}</span>
          <span>100</span>
        </div>
      )}
    </div>
  );
}
