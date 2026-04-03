/**
 * AI Engine for TaskMind AI
 * Handles WebLLM integration and text analysis
 */

import * as webllm from '@mlc-ai/web-llm';
import {
  SYSTEM_PROMPT,
  ANALYSIS_PROMPT,
} from './prompts';

export interface AnalysisResult {
  summary: string;
  tasks: Task[];
  decisions: Decision[];
  confusionItems: ConfusionItem[];
  language: 'en' | 'fil';
}

export interface Task {
  content: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  urgencyScore: number;
  deadline: string | null;
  deadlineDisplay: string | null;
  category: 'work' | 'personal' | 'meeting' | 'email' | 'document' | 'other';
}

export interface Decision {
  content: string;
  stakeholders: string | null;
}

export interface ConfusionItem {
  item: string;
  suggestion: string | null;
}

export interface EngineConfig {
  modelId?: string;
  initProgressCallback?: (progress: { progress: number; text: string }) => void;
}

class AIEngine {
  private engine: webllm.MLCEngine | null = null;
  private isInitialized = false;
  private isInitializing = false;
  private initPromise: Promise<void> | null = null;

  async initialize(config: EngineConfig = {}): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    if (this.isInitializing && this.initPromise) {
      return this.initPromise;
    }

    this.isInitializing = true;

    this.initPromise = (async () => {
      try {
        const modelId = config.modelId || 'Llama-3.2-1B-Instruct-q4f32_1-MLC';
        
        this.engine = await webllm.CreateMLCEngine(modelId, {
          initProgressCallback: config.initProgressCallback,
        });
        
        this.isInitialized = true;
        console.log('AI Engine initialized with model:', modelId);
      } catch (error) {
        console.error('Failed to initialize AI Engine:', error);
        throw error;
      } finally {
        this.isInitializing = false;
      }
    })();

    return this.initPromise;
  }

  async analyze(text: string): Promise<AnalysisResult> {
    if (!this.isInitialized || !this.engine) {
      throw new Error('AI Engine not initialized. Call initialize() first.');
    }

    try {
      const prompt = ANALYSIS_PROMPT.replace('{{TEXT}}', text);
      
      const response = await this.engine.chat.completions.create({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2048,
      });

      const content = response.choices[0]?.message?.content || '{}';
      
      return this.parseResponse(content);
    } catch (error) {
      console.error('Analysis failed:', error);
      throw error;
    }
  }

  private parseResponse(content: string): AnalysisResult {
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : content;
      
      const parsed = JSON.parse(jsonString);
      
      // Validate and normalize the response
      return {
        summary: parsed.summary || 'No summary available',
        tasks: Array.isArray(parsed.tasks) ? parsed.tasks.map(this.normalizeTask) : [],
        decisions: Array.isArray(parsed.decisions) ? parsed.decisions : [],
        confusionItems: Array.isArray(parsed.confusionItems) ? parsed.confusionItems : [],
        language: parsed.language === 'fil' ? 'fil' : 'en',
      };
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.log('Raw response:', content);
      
      // Return a fallback result
      return {
        summary: 'Unable to parse response. Please try again.',
        tasks: [],
        decisions: [],
        confusionItems: [{
          item: 'Failed to parse AI response',
          suggestion: 'Please rephrase your text or try again',
        }],
        language: 'en',
      };
    }
  }

  private normalizeTask(task: any): Task {
    return {
      content: task.content || 'Unnamed task',
      urgencyLevel: this.validateUrgencyLevel(task.urgencyLevel),
      urgencyScore: this.clampUrgencyScore(task.urgencyScore),
      deadline: task.deadline || null,
      deadlineDisplay: task.deadlineDisplay || null,
      category: this.validateCategory(task.category),
    };
  }

  private validateUrgencyLevel(level: string): Task['urgencyLevel'] {
    const validLevels = ['low', 'medium', 'high', 'critical'];
    if (validLevels.includes(level)) {
      return level as Task['urgencyLevel'];
    }
    return 'medium';
  }

  private clampUrgencyScore(score: number): number {
    if (typeof score !== 'number') return 50;
    return Math.max(0, Math.min(100, score));
  }

  private validateCategory(category: string): Task['category'] {
    const validCategories = ['work', 'personal', 'meeting', 'email', 'document', 'other'];
    if (validCategories.includes(category)) {
      return category as Task['category'];
    }
    return 'other';
  }

  async chat(messages: Array<{ role: string; content: string }>): Promise<string> {
    if (!this.isInitialized || !this.engine) {
      throw new Error('AI Engine not initialized');
    }

    const response = await this.engine.chat.completions.create({
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 1024,
    });

    return response.choices[0]?.message?.content || '';
  }

  isReady(): boolean {
    return this.isInitialized;
  }

  async reset(): Promise<void> {
    this.engine = null;
    this.isInitialized = false;
    this.isInitializing = false;
    this.initPromise = null;
  }
}

// Export singleton instance
export const aiEngine = new AIEngine();
