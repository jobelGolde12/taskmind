'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Timer } from 'lucide-react';
import { format, isPast, isToday, isTomorrow, differenceInDays } from 'date-fns';

interface DeadlineCardProps {
  deadline: string | null;
  deadlineDisplay?: string | null;
  compact?: boolean;
}

export function DeadlineCard({ deadline, deadlineDisplay, compact = false }: DeadlineCardProps) {
  if (!deadline && !deadlineDisplay) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1.5 text-xs text-muted-foreground">
        <Calendar className="h-3.5 w-3.5" />
        <span>No deadline</span>
      </div>
    );
  }

  const deadlineDate = deadline ? new Date(deadline) : null;
  const isOverdue = deadlineDate && isPast(deadlineDate) && !isToday(deadlineDate);
  const isDueToday = deadlineDate && isToday(deadlineDate);
  const isDueTomorrow = deadlineDate && isTomorrow(deadlineDate);
  const daysUntil = deadlineDate ? differenceInDays(deadlineDate, new Date()) : null;

  const displayText = deadlineDisplay || (deadlineDate ? format(deadlineDate, 'MMM d, yyyy h:mm a') : '');

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs ${
          isOverdue
            ? 'bg-red-500/20 text-red-300'
            : isDueToday
              ? 'bg-orange-500/20 text-orange-300'
              : 'bg-white/5 text-muted-foreground'
        }`}
      >
        <Clock className="h-3.5 w-3.5" />
        <span>{displayText}</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative overflow-hidden rounded-xl border p-4 ${
        isOverdue
          ? 'border-red-500/30 bg-red-500/10'
          : isDueToday
            ? 'border-orange-500/30 bg-orange-500/10'
            : 'border-white/10 bg-white/5'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      
      <div className="relative flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
            isOverdue
              ? 'bg-red-500/20'
              : isDueToday
                ? 'bg-orange-500/20'
                : 'bg-white/10'
          }`}
        >
          {isOverdue ? (
            <Timer className="h-5 w-5 text-red-400" />
          ) : isDueToday ? (
            <Clock className="h-5 w-5 text-orange-400" />
          ) : (
            <Calendar className="h-5 w-5 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 space-y-1">
          <p
            className={`text-sm font-medium ${
              isOverdue ? 'text-red-200' : isDueToday ? 'text-orange-200' : 'text-foreground'
            }`}
          >
            {displayText}
          </p>
          
          {isOverdue && (
            <p className="text-xs text-red-300/70">Overdue by {Math.abs(daysUntil || 0)} days</p>
          )}
          
          {daysUntil !== null && daysUntil > 0 && (
            <p className="text-xs text-muted-foreground">
              {daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
            </p>
          )}
        </div>
      </div>
      
      <div
        className={`absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl ${
          isOverdue ? 'bg-red-500/10' : isDueToday ? 'bg-orange-500/10' : 'bg-white/5'
        }`}
      />
    </motion.div>
  );
}

interface DeadlineListProps {
  deadlines: Array<{
    deadline: string | null;
    deadlineDisplay?: string | null;
  }>;
  title?: string;
}

export function DeadlineList({ deadlines, title = 'Deadlines' }: DeadlineListProps) {
  if (!deadlines || deadlines.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      
      <div className="grid gap-2 sm:grid-cols-2">
        {deadlines.map((item, index) => (
          <DeadlineCard
            key={index}
            deadline={item.deadline}
            deadlineDisplay={item.deadlineDisplay}
            compact
          />
        ))}
      </div>
    </div>
  );
}
