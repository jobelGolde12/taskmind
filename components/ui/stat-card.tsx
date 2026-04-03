'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: number;
  variant?: 'default' | 'warning' | 'urgent';
}

export function StatCard({ title, value, description, icon: Icon, trend, variant = 'default' }: StatCardProps) {
  const variants = {
    default: 'from-blue-500/20 to-purple-600/20',
    warning: 'from-orange-500/20 to-red-600/20',
    urgent: 'from-red-500/20 to-pink-600/20',
  };

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-1 text-3xl font-bold">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          </div>
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${variants[variant]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        {trend !== undefined && (
          <div className="mt-4 flex items-center gap-1 text-xs text-green-400">
            <TrendingUp className="h-3 w-3" />
            <span>{trend}% completion rate</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface DeadlineStatProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  count: number;
  color: string;
  bgColor: string;
}

export function DeadlineStat({ icon: Icon, label, count, color, bgColor }: DeadlineStatProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bgColor}`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-muted-foreground">Tasks</p>
        </div>
      </div>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
}
