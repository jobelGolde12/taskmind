import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  saveAnalysis as idbSaveAnalysis,
  deleteAnalysis as idbDeleteAnalysis,
  clearAllAnalyses as idbClearAllAnalyses,
} from '@/lib/indexed-db';

export interface Task {
  id: string;
  content: string;
  completed: boolean;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  urgencyScore: number;
  deadline: string | null;
  deadlineDisplay: string | null;
  category: 'work' | 'personal' | 'meeting' | 'email' | 'document' | 'other';
}

export interface Decision {
  id: string;
  content: string;
  stakeholders: string | null;
}

export interface ConfusionItem {
  id: string;
  item: string;
  suggestion: string | null;
}

export interface Analysis {
  id: string;
  originalText: string;
  summary: string;
  tasks: Task[];
  decisions: Decision[];
  confusionItems: ConfusionItem[];
  language: 'en' | 'fil';
  createdAt: string;
}

interface InitProgress {
  progress: number;
  text: string;
}

interface AppState {
  // Current analysis
  currentAnalysis: Analysis | null;
  isAnalyzing: boolean;
  analysisProgress: InitProgress | null;
  
  // History
  analyses: Analysis[];
  isHydrated: boolean;
  
  // UI State
  darkMode: boolean;
  sidebarOpen: boolean;
  selectedModel: string;
  
  // Filters
  filterUrgency: string | null;
  filterCategory: string | null;
  searchQuery: string;
  
  // Actions
  setCurrentAnalysis: (analysis: Analysis | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setAnalysisProgress: (progress: InitProgress | null) => void;
  addAnalysis: (analysis: Analysis) => Promise<void>;
  deleteAnalysis: (id: string) => Promise<void>;
  clearAllAnalyses: () => Promise<void>;
  setIsHydrated: (hydrated: boolean) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  toggleTaskCompletion: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  setFilterUrgency: (urgency: string | null) => void;
  setFilterCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedModel: (model: string) => void;
  clearFilters: () => void;
}

const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentAnalysis: null,
      isAnalyzing: false,
      analysisProgress: null,
      analyses: [],
      isHydrated: false,
      darkMode: true,
      sidebarOpen: true,
      selectedModel: 'Llama-3.2-1B-Instruct-q4f32_1-MLC',
      filterUrgency: null,
      filterCategory: null,
      searchQuery: '',
      
      // Actions
      setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),
      
      setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
      
      setAnalysisProgress: (progress) => set({ analysisProgress: progress }),
      
      addAnalysis: async (analysis) => {
        const newAnalysis = { ...analysis, id: generateId(), createdAt: new Date().toISOString() };
        
        set((state) => ({
          currentAnalysis: newAnalysis,
          analyses: [newAnalysis, ...state.analyses],
        }));
        
        await idbSaveAnalysis(newAnalysis);
      },
      
      deleteAnalysis: async (id) => {
        set((state) => ({
          analyses: state.analyses.filter((a) => a.id !== id),
          currentAnalysis: state.currentAnalysis?.id === id ? null : state.currentAnalysis,
        }));
        
        await idbDeleteAnalysis(id);
      },
      
      clearAllAnalyses: async () => {
        set({
          analyses: [],
          currentAnalysis: null,
        });
        
        await idbClearAllAnalyses();
      },
      
      updateTask: (taskId, updates) => {
        set((state) => ({
          currentAnalysis: state.currentAnalysis
            ? {
                ...state.currentAnalysis,
                tasks: state.currentAnalysis.tasks.map((task) =>
                  task.id === taskId ? { ...task, ...updates } : task
                ),
              }
            : null,
        }));
      },
      
      toggleTaskCompletion: (taskId) => {
        set((state) => ({
          currentAnalysis: state.currentAnalysis
            ? {
                ...state.currentAnalysis,
                tasks: state.currentAnalysis.tasks.map((task) =>
                  task.id === taskId ? { ...task, completed: !task.completed } : task
                ),
              }
            : null,
        }));
      },
      
      deleteTask: (taskId) => {
        set((state) => ({
          currentAnalysis: state.currentAnalysis
            ? {
                ...state.currentAnalysis,
                tasks: state.currentAnalysis.tasks.filter((task) => task.id !== taskId),
              }
            : null,
        }));
      },
      
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      setFilterUrgency: (urgency) => set({ filterUrgency: urgency }),
      
      setFilterCategory: (category) => set({ filterCategory: category }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setSelectedModel: (model) => set({ selectedModel: model }),
      
      clearFilters: () => set({ filterUrgency: null, filterCategory: null, searchQuery: '' }),
      
      setIsHydrated: (hydrated) => set({ isHydrated: hydrated }),
    }),
    {
      name: 'taskmind-storage',
      partialize: (state) => ({
        darkMode: state.darkMode,
        selectedModel: state.selectedModel,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setIsHydrated(true);
      },
    }
  )
);
