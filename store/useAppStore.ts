import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  
  // UI State
  darkMode: boolean;
  sidebarOpen: boolean;
  
  // Filters
  filterUrgency: string | null;
  filterCategory: string | null;
  searchQuery: string;
  
  // Actions
  setCurrentAnalysis: (analysis: Analysis | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setAnalysisProgress: (progress: InitProgress | null) => void;
  addAnalysis: (analysis: Analysis) => void;
  deleteAnalysis: (id: string) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  toggleTaskCompletion: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  setFilterUrgency: (urgency: string | null) => void;
  setFilterCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
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
      darkMode: true,
      sidebarOpen: true,
      filterUrgency: null,
      filterCategory: null,
      searchQuery: '',
      
      // Actions
      setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),
      
      setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
      
      setAnalysisProgress: (progress) => set({ analysisProgress: progress }),
      
      addAnalysis: (analysis) => {
        const newAnalysis = { ...analysis, id: generateId(), createdAt: new Date().toISOString() };
        set((state) => ({
          currentAnalysis: newAnalysis,
          analyses: [newAnalysis, ...state.analyses],
        }));
      },
      
      deleteAnalysis: (id) => {
        set((state) => ({
          analyses: state.analyses.filter((a) => a.id !== id),
          currentAnalysis: state.currentAnalysis?.id === id ? null : state.currentAnalysis,
        }));
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
      
      clearFilters: () => set({ filterUrgency: null, filterCategory: null, searchQuery: '' }),
    }),
    {
      name: 'taskmind-storage',
      partialize: (state) => ({
        analyses: state.analyses,
        darkMode: state.darkMode,
      }),
    }
  )
);
