'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FileText, X, Loader2, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAppStore } from '@/store/useAppStore';
import { aiEngine } from '@/lib/ai-engine';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { addAnalysis } = useAppStore();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file type
      const validTypes = ['text/plain', 'application/pdf', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'];
      
      if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.txt')) {
        setError('Please upload a valid file (TXT, PDF, DOC, or DOCX)');
        return;
      }

      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setFile(selectedFile);
      setError(null);
      readFile(selectedFile);
    }
  };

  const readFile = async (file: File) => {
    try {
      setIsUploading(true);
      
      if (file.type === 'application/pdf') {
        setError('PDF parsing requires additional setup. Please use TXT files for now.');
        setIsUploading(false);
        return;
      }

      const text = await file.text();
      setTextContent(text);
      setSuccess(false);
    } catch (err) {
      setError('Failed to read file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      const event = {
        target: {
          files: [droppedFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(event);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleClearFile = () => {
    setFile(null);
    setTextContent('');
    setError(null);
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleProcess = async () => {
    if (!textContent.trim()) {
      setError('No text content to process');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Initialize AI engine if needed
      if (!aiEngine.isReady()) {
        await aiEngine.initialize();
      }

      // Analyze the text
      const result = await aiEngine.analyze(textContent);

      // Convert to format with IDs
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
        originalText: textContent,
        summary: result.summary,
        tasks: tasksWithIds,
        decisions: decisionsWithIds,
        confusionItems: confusionWithIds,
        language: result.language,
        createdAt: new Date().toISOString(),
      };

      addAnalysis(analysis);
      setSuccess(true);
    } catch (err) {
      console.error('Processing failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to process file. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Upload File</h1>
        <p className="text-muted-foreground">
          Upload a document to extract action items and decisions
        </p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
          <CardDescription>
            Supported formats: TXT (PDF and DOCX support coming soon)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!file ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-white/5 p-12 text-center transition-colors hover:border-white/20 hover:bg-white/[0.07]"
            >
              <UploadIcon className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-2 text-sm font-medium">Drop your file here or click to browse</p>
              <p className="text-xs text-muted-foreground">Max file size: 5MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* File Info */}
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                    <FileText className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClearFile}
                  className="rounded p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Text Preview */}
              {textContent && (
                <div>
                  <label className="mb-2 block text-sm font-medium">Text Preview</label>
                  <Textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>
              )}

              {/* Error/Success Messages */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>File processed successfully! Check your dashboard.</span>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={handleClearFile} disabled={isProcessing}>
                  Clear
                </Button>
                <Button
                  onClick={handleProcess}
                  disabled={isProcessing || isUploading || !textContent.trim()}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <UploadIcon className="mr-2 h-4 w-4" />
                      Process File
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid gap-4 sm:grid-cols-3">
        <FeatureCard
          icon={FileText}
          title="Text Files"
          description="Upload .txt files for instant analysis"
        />
        <FeatureCard
          icon={UploadIcon}
          title="Drag & Drop"
          description="Simply drag and drop your files"
        />
        <FeatureCard
          icon={CheckCircle2}
          title="Privacy First"
          description="All processing happens locally"
        />
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border-white/10 bg-white/5">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <Icon className="mb-3 h-8 w-8 text-muted-foreground" />
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
