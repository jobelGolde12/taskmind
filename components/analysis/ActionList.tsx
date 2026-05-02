'use client';

import { AnimatePresence } from 'framer-motion';
import { ActionItem, TaskItem } from './ActionItem';

interface ActionListProps {
  tasks: TaskItem[];
  onToggleComplete?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (taskId: string, newContent: string) => void;
  editable?: boolean;
}

export function ActionList({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
  editable = false,
}: ActionListProps) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
        <p className="text-sm text-muted-foreground">No tasks extracted yet</p>
        <p className="text-xs text-muted-foreground/70">
          Enter your text above to extract action items
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">Action Items</h3>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-muted-foreground">
            {tasks.length}
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          {tasks.filter((t) => t.completed).length} completed
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <ActionItem
            key={task.id}
            task={task}
            index={index}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEdit={onEdit}
            editable={editable}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
