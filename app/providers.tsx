'use client';

import { useAppStore } from '@/store/useAppStore';
import { useEffect, useState } from 'react';
import { getAllAnalyses } from '@/lib/indexed-db';

export function Providers({ children }: { children: React.ReactNode }) {
  const { setIsHydrated } = useAppStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function initializeDB() {
      try {
        const storedAnalyses = await getAllAnalyses();
        
        if (storedAnalyses.length > 0) {
          useAppStore.setState({ analyses: storedAnalyses });
        }
        
        setIsHydrated(true);
      } catch (err) {
        console.error('Failed to initialize IndexedDB:', err);
        setIsHydrated(true);
      } finally {
        setIsReady(true);
      }
    }

    initializeDB();
  }, [setIsHydrated]);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
