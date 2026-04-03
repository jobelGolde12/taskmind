'use client';

import { motion } from 'framer-motion';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { UrgencyBadge } from './UrgencyBadge';
import { DeadlineCard } from './DeadlineCard';

export interface TaskItem {
  id: string;
  content: string;
  completed: boolean;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  urgencyScore: number;
  deadline: string | null;
  deadlineDisplay: string | null;
  category: 'work' | 'personal' | 'meeting' | 'email' | 'document' | 'other';
}

interface ActionItemProps {
  task: TaskItem;
  index: number;
  onToggleComplete?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (taskId: string, newContent: string) => void;
  editable?: boolean;
}

export function ActionItem({
  task,
  index,
  onToggleComplete,
  onDelete,
  onEdit,
  editable = false,
}: ActionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-xl border bg-white/5 p-4 transition-all hover:bg-white/[0.07] ${
        task.completed ? 'border-white/5 opacity-60' : 'border-white/10'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />

      <div className="relative flex items-start gap-3">
        <button
          onClick={() => onToggleComplete?.(task.id)}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
            task.completed
              ? 'border-green-500 bg-green-500/20 text-green-400'
              : 'border-white/20 hover:border-white/40'
          }`}
        >
          {task.completed && <Check className="h-3.5 w-3.5" />}
        </button>

        <div className="flex-1 space-y-2">
          <p
            className={`text-sm ${
              task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
            }`}
          >
            {task.content}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <UrgencyBadge level={task.urgencyLevel} score={task.urgencyScore} size="sm" />
            
            {task.category !== 'other' && (
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs capitalize text-muted-foreground">
                {task.category}
              </span>
            )}
          </div>

          {(task.deadline || task.deadlineDisplay) && (
            <DeadlineCard deadline={task.deadline} deadlineDisplay={task.deadlineDisplay} compact />
          )}
        </div>

        {editable && (
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => onEdit?.(task.id, task.content)}
              className="rounded p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              title="Edit task"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onDelete?.(task.id)}
              className="rounded p-1.5 text-muted-foreground hover:bg-red-500/20 hover:text-red-400"
              title="Delete task"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}
