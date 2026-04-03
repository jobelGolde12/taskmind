'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Loader2, Eraser } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ActionList } from '@/components/analysis/ActionList';
import { ConfusionList } from '@/components/analysis/ConfusionBox';
import { UrgencyBadge, UrgencyMeter } from '@/components/analysis/UrgencyBadge';
import { DeadlineCard } from '@/components/analysis/DeadlineCard';
import { useAppStore } from '@/store/useAppStore';
import { aiEngine } from '@/lib/ai-engine';
import { cleanText } from '@/utils/textCleaner';

export default function AnalyzePage() {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { addAnalysis, setCurrentAnalysis, setAnalysisProgress } = useAppStore();

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    const trimmed = inputText.trim();
    
    if (trimmed.length < 10) {
      setError('Please enter more text (at least 10 characters)');
      return;
    }

    if (trimmed.length > 50000) {
      setError('Text is too long. Please limit to 50,000 characters for optimal performance.');
      return;
    }

    const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
    if (wordCount < 3) {
      setError('Please enter more meaningful text (at least 3 words)');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Clean the input text
      const cleaned = cleanText(inputText);
      
      if (cleaned.isTooShort || cleaned.cleaned.length < 10) {
        setError('Please enter more text (at least 10 characters)');
        setIsProcessing(false);
        return;
      }

      if (cleaned.cleaned.length > 50000) {
        setError('Text is too long after processing. Please reduce the input.');
        setIsProcessing(false);
        return;
      }

      // Initialize AI engine if not already done
      if (!aiEngine.isReady()) {
        await aiEngine.initialize({
          initProgressCallback: (progress) => {
            setAnalysisProgress({
              progress: progress.progress,
              text: progress.text,
            });
          },
        });
      }

      // Analyze the text
      const result = await aiEngine.analyze(cleaned.cleaned);
      
      // Convert tasks to include IDs
      const tasksWithIds = result.tasks.map((task, index) => ({
        ...task,
        id: `task_${Date.now()}_${index}`,
        completed: false,
      }));

      const decisionsWithIds = result.decisions.map((decision, index) => ({
        ...decision,
        id: `decision_${Date.now()}_${index}`,
      }));

      const confusionWithIds = result.confusionItems.map((item, index) => ({
        ...item,
        id: `confusion_${Date.now()}_${index}`,
      }));

      const analysis = {
        id: `analysis_${Date.now()}`,
        originalText: inputText,
        summary: result.summary,
        tasks: tasksWithIds,
        decisions: decisionsWithIds,
        confusionItems: confusionWithIds,
        language: result.language,
        createdAt: new Date().toISOString(),
      };

      addAnalysis(analysis);
      setInputText('');
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze text. Please try again.');
    } finally {
      setIsProcessing(false);
      setAnalysisProgress(null);
    }
  };

  const handleClear = () => {
    setInputText('');
    setError(null);
  };

  const currentAnalysis = useAppStore((state) => state.currentAnalysis);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Analyze Text</h1>
        <p className="text-muted-foreground">
          Paste your email, message, or announcement to extract action items
        </p>
      </div>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Input Text</CardTitle>
          <CardDescription>
            Enter the text you want to analyze. The AI will extract tasks, deadlines, and decisions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your email, message, or announcement here..."
              className="min-h-[200px] resize-none"
              disabled={isProcessing}
            />
            {inputText && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-3 rounded p-1 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                title="Clear text"
              >
                <Eraser className="h-4 w-4" />
              </button>
            )}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
            >
              {error}
            </motion.div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {inputText.length} characters
            </div>
            <Button onClick={handleAnalyze} disabled={isProcessing || !inputText.trim()}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Analyze
                </>
              )}
            </Button>
          </div>

          {/* Loading Progress */}
          {isProcessing && useAppStore.getState().analysisProgress && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <div className="text-xs text-muted-foreground">
                {useAppStore.getState().analysisProgress?.text}
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(useAppStore.getState().analysisProgress?.progress || 0) * 100}%` }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                />
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {currentAnalysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Summary</CardTitle>
                  <CardDescription>AI-generated overview</CardDescription>
                </div>
                <UrgencyBadge
                  level={
                    currentAnalysis.tasks.some((t) => t.urgencyLevel === 'critical')
                      ? 'critical'
                      : currentAnalysis.tasks.some((t) => t.urgencyLevel === 'high')
                        ? 'high'
                        : 'medium'
                  }
                  size="sm"
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{currentAnalysis.summary}</p>
              
              {/* Overall Urgency */}
              <div className="mt-4">
                <UrgencyMeter
                  score={
                    currentAnalysis.tasks.length > 0
                      ? Math.round(
                          currentAnalysis.tasks.reduce((acc, t) => acc + t.urgencyScore, 0) /
                            currentAnalysis.tasks.length
                        )
                      : 0
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle>Action Items</CardTitle>
              <CardDescription>
                Extracted tasks with priorities and deadlines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActionList
                tasks={currentAnalysis.tasks}
                onToggleComplete={(taskId) => {
                  useAppStore.getState().toggleTaskCompletion(taskId);
                }}
                editable
              />
            </CardContent>
          </Card>

          {/* Decisions */}
          {currentAnalysis.decisions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Decisions</CardTitle>
                <CardDescription>Key decisions identified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentAnalysis.decisions.map((decision, index) => (
                  <div
                    key={decision.id}
                    className="rounded-lg border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-sm">{decision.content}</p>
                    {decision.stakeholders && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Stakeholders: {decision.stakeholders}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Confusion Items */}
          {currentAnalysis.confusionItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Needs Clarification</CardTitle>
                <CardDescription>
                  Unclear items that may need attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ConfusionList items={currentAnalysis.confusionItems} />
              </CardContent>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  );
}
