'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Trash2, Eye, Download, Calendar, X, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import { format as formatDate } from 'date-fns';
import { UrgencyBadge } from '@/components/analysis/UrgencyBadge';

export default function HistoryPage() {
  const { analyses, deleteAnalysis, clearAllAnalyses, setCurrentAnalysis } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUrgency, setFilterUrgency] = useState<string | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Filter analyses
  const filteredAnalyses = analyses.filter((analysis) => {
    const matchesSearch =
      analysis.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      analysis.originalText.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUrgency =
      !filterUrgency ||
      analysis.tasks.some((t) => t.urgencyLevel === filterUrgency);

    return matchesSearch && matchesUrgency;
  });

  const handleViewAnalysis = (analysisId: string) => {
    const analysis = analyses.find((a) => a.id === analysisId);
    if (analysis) {
      setCurrentAnalysis(analysis);
      setSelectedAnalysis(analysisId);
    }
  };

  const handleDeleteAnalysis = (analysisId: string) => {
    if (confirm('Are you sure you want to delete this analysis?')) {
      deleteAnalysis(analysisId);
      if (selectedAnalysis === analysisId) {
        setSelectedAnalysis(null);
      }
    }
  };

  const handleExport = (analysis: typeof analyses[0], format: 'json' | 'md') => {
    let content = '';
    let mimeType = '';
    let extension = '';

    if (format === 'json') {
      content = JSON.stringify(analysis, null, 2);
      mimeType = 'application/json';
      extension = 'json';
    } else {
      content = `# ${analysis.summary}\n\n`;
      content += `**Date:** ${formatDate(new Date(analysis.createdAt), 'PPP p')}\n\n`;
      content += `## Tasks (${analysis.tasks.length})\n\n`;
      analysis.tasks.forEach((task, i) => {
        content += `${i + 1}. ${task.completed ? '[x]' : '[ ]'} ${task.content}\n`;
        content += `   - Priority: ${task.urgencyLevel}\n`;
        if (task.deadline) {
          content += `   - Deadline: ${task.deadlineDisplay || task.deadline}\n`;
        }
      });

      if (analysis.decisions.length > 0) {
        content += `\n## Decisions (${analysis.decisions.length})\n\n`;
        analysis.decisions.forEach((decision, i) => {
          content += `${i + 1}. ${decision.content}\n`;
        });
      }

      if (analysis.confusionItems.length > 0) {
        content += `\n## Needs Clarification (${analysis.confusionItems.length})\n\n`;
        analysis.confusionItems.forEach((item, i) => {
          content += `${i + 1}. ${item.item}\n`;
          if (item.suggestion) {
            content += `   - ${item.suggestion}\n`;
          }
        });
      }

      mimeType = 'text/markdown';
      extension = 'md';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskmind-analysis-${Date.now()}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">History</h1>
          <p className="text-muted-foreground">View and manage your past analyses</p>
        </div>
        {analyses.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowClearConfirm(true)}
            className="text-red-400 hover:bg-red-500/20 hover:text-red-300"
          >
            <Trash2 className="mr-2 h-3.5 w-3.5" />
            Clear All
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search analyses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={filterUrgency || ''}
              onChange={(e) => setFilterUrgency(e.target.value || null)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">All Urgency Levels</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredAnalyses.length} of {analyses.length} analyses
        </p>
      </div>

      {/* Analyses List */}
      {filteredAnalyses.length > 0 ? (
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {filteredAnalyses.map((analysis) => (
              <motion.div
                key={analysis.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                layout
              >
                <Card className={`transition-colors ${selectedAnalysis === analysis.id ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/10 bg-white/5'}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{analysis.summary}</CardTitle>
                          <UrgencyBadge
                            level={
                              analysis.tasks.some((t) => t.urgencyLevel === 'critical')
                                ? 'critical'
                                : analysis.tasks.some((t) => t.urgencyLevel === 'high')
                                  ? 'high'
                                  : 'medium'
                            }
                            size="sm"
                          />
                        </div>
                        <CardDescription className="mt-2">
                          <div className="flex flex-wrap items-center gap-3 text-xs">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(new Date(analysis.createdAt), 'MMM d, yyyy h:mm a')}
                            </span>
                            <span>{analysis.tasks.length} tasks</span>
                            <span>{analysis.decisions.length} decisions</span>
                            <span>{analysis.confusionItems.length} clarifications</span>
                            <span className="capitalize">{analysis.language === 'fil' ? 'Filipino' : 'English'}</span>
                          </div>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Task Preview */}
                    <div className="mb-4 space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Tasks Preview:</p>
                      <div className="space-y-1">
                        {analysis.tasks.slice(0, 3).map((task) => (
                          <div key={task.id} className="flex items-center gap-2 text-sm">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                task.completed ? 'bg-green-500' : 'bg-muted-foreground'
                              }`}
                            />
                            <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                              {task.content}
                            </span>
                          </div>
                        ))}
                        {analysis.tasks.length > 3 && (
                          <p className="text-xs text-muted-foreground">
                            +{analysis.tasks.length - 3} more tasks
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 border-t border-white/10 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewAnalysis(analysis.id)}
                      >
                        <Eye className="mr-2 h-3.5 w-3.5" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleExport(analysis, 'md')}
                      >
                        <Download className="mr-2 h-3.5 w-3.5" />
                        MD
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleExport(analysis, 'json')}
                      >
                        <Download className="mr-2 h-3.5 w-3.5" />
                        JSON
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAnalysis(analysis.id)}
                        className="text-red-400 hover:bg-red-500/20 hover:text-red-300"
                      >
                        <Trash2 className="mr-2 h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-sm font-medium text-foreground">No analyses found</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {searchQuery || filterUrgency
                ? 'Try adjusting your search or filters'
                : 'Start by analyzing your first text'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Selected Analysis Detail */}
      {selectedAnalysis && (() => {
        const analysis = analyses.find((a) => a.id === selectedAnalysis);
        if (!analysis) return null;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-xl border border-white/10 bg-background"
            >
              <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-background/80 backdrop-blur-sm p-4">
                <div>
                  <h2 className="text-xl font-bold">Analysis Details</h2>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(new Date(analysis.createdAt), 'PPP p')}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedAnalysis(null)}
                  className="rounded p-1.5 text-muted-foreground hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6 p-6">
                {/* Summary */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Summary</h3>
                  <p className="text-sm">{analysis.summary}</p>
                </div>

                {/* Original Text */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Original Text</h3>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="text-sm whitespace-pre-wrap">{analysis.originalText}</p>
                  </div>
                </div>

                {/* Tasks */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-muted-foreground">Tasks</h3>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-muted-foreground">
                      {analysis.tasks.length}
                    </span>
                  </div>
                  {analysis.tasks.length > 0 ? (
                    <div className="space-y-2">
                      {analysis.tasks.map((task) => (
                        <div
                          key={task.id}
                          className={`flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3 ${
                            task.completed ? 'opacity-60' : ''
                          }`}
                        >
                          <div
                            className={`mt-0.5 h-4 w-4 shrink-0 rounded border ${
                              task.completed
                                ? 'border-green-500 bg-green-500/20'
                                : 'border-white/20'
                            }`}
                          />
                          <div className="flex-1 space-y-1">
                            <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {task.content}
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                              <UrgencyBadge level={task.urgencyLevel} score={task.urgencyScore} size="sm" />
                              {task.category !== 'other' && (
                                <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs capitalize text-muted-foreground">
                                  {task.category}
                                </span>
                              )}
                              {task.deadlineDisplay && (
                                <span className="text-xs text-muted-foreground">
                                  Due: {task.deadlineDisplay}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No tasks extracted</p>
                  )}
                </div>

                {/* Decisions */}
                {analysis.decisions.length > 0 && (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-muted-foreground">Decisions</h3>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-muted-foreground">
                        {analysis.decisions.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {analysis.decisions.map((decision) => (
                        <div
                          key={decision.id}
                          className="rounded-lg border border-white/10 bg-white/5 p-3"
                        >
                          <p className="text-sm">{decision.content}</p>
                          {decision.stakeholders && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              Stakeholders: {decision.stakeholders}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Confusion Items */}
                {analysis.confusionItems.length > 0 && (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-muted-foreground">Needs Clarification</h3>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-muted-foreground">
                        {analysis.confusionItems.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {analysis.confusionItems.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3"
                        >
                          <p className="text-sm">{item.item}</p>
                          {item.suggestion && (
                            <p className="mt-1 text-xs text-amber-200/70">
                              Suggestion: {item.suggestion}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Language */}
                <div className="flex items-center gap-2 border-t border-white/10 pt-4">
                  <span className="text-xs text-muted-foreground">Language:</span>
                  <span className="text-xs capitalize">{analysis.language === 'fil' ? 'Filipino' : 'English'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        );
      })()}

      {/* Clear All Confirmation Dialog */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md rounded-xl border border-white/10 bg-background p-6"
          >
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Clear All Analyses</h2>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Are you sure you want to delete all {analyses.length} analyses? This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  clearAllAnalyses();
                  setShowClearConfirm(false);
                }}
              >
                Delete All
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
