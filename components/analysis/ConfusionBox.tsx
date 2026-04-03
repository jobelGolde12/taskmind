'use client';

import { motion } from 'framer-motion';
import { AlertCircle, HelpCircle } from 'lucide-react';

interface ConfusionBoxProps {
  item: string;
  suggestion?: string | null;
  index?: number;
}

export function ConfusionBox({ item, suggestion, index = 0 }: ConfusionBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm p-4"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
      
      <div className="relative flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
          <AlertCircle className="h-4 w-4 text-amber-400" />
        </div>
        
        <div className="flex-1 space-y-2">
          <p className="text-sm font-medium text-amber-200">{item}</p>
          
          {suggestion && (
            <div className="flex items-start gap-2">
              <HelpCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400/70" />
              <p className="text-xs text-amber-300/70">{suggestion}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl" />
    </motion.div>
  );
}

interface ConfusionListProps {
  items: Array<{ item: string; suggestion?: string | null }>;
  title?: string;
}

export function ConfusionList({ items, title = 'Needs Clarification' }: ConfusionListProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-amber-400" />
        <h3 className="text-sm font-semibold text-amber-200">{title}</h3>
        <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300">
          {items.length}
        </span>
      </div>
      
      <div className="space-y-2">
        {items.map((confusion, index) => (
          <ConfusionBox
            key={index}
            item={confusion.item}
            suggestion={confusion.suggestion}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
