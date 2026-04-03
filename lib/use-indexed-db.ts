'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { getAllAnalyses, saveAnalysis, deleteAnalysis, clearAllAnalyses as idbClearAll } from '@/lib/indexed-db';
import { Analysis } from '@/store/useAppStore';

export function useIndexedDB() {
  const { analyses, setCurrentAnalysis, isHydrated, setIsHydrated } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadFromIDB() {
      try {
        const storedAnalyses = await getAllAnalyses();
        
        if (storedAnalyses.length > 0) {
          useAppStore.setState({ analyses: storedAnalyses });
        }
        
        setIsHydrated(true);
      } catch (err) {
        console.error('Failed to load from IndexedDB:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsHydrated(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadFromIDB();
  }, [setIsHydrated]);

  const syncAnalysis = async (analysis: Analysis) => {
    await saveAnalysis(analysis);
  };

  const removeAnalysis = async (id: string) => {
    await deleteAnalysis(id);
  };

  const clearAll = async () => {
    await idbClearAll();
  };

  return {
    analyses,
    isLoading,
    isHydrated,
    error,
    syncAnalysis,
    removeAnalysis,
    clearAll,
  };
}
