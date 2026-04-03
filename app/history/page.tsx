'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Trash2, Eye, Download, Calendar, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import { format as formatDate } from 'date-fns';
import { UrgencyBadge } from '@/components/analysis/UrgencyBadge';

export default function HistoryPage() {
  const { analyses, deleteAnalysis, setCurrentAnalysis } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUrgency, setFilterUrgency] = useState<string | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);

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
      <div>
        <h1 className="text-2xl font-bold">History</h1>
        <p className="text-muted-foreground">View and manage your past analyses</p>
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
                        {analysis.tasks.slice(0, 3).map((task, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
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
      {selectedAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-xl border border-white/10 bg-background p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Analysis Details</h2>
              <button
                onClick={() => setSelectedAnalysis(null)}
                className="rounded p-1.5 text-muted-foreground hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Full analysis content would go here */}
            <p className="text-sm text-muted-foreground">
              Full analysis view - implement as needed
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
