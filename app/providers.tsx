'use client';

import { useAppStore } from '@/store/useAppStore';
import { useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const darkMode = useAppStore((state) => state.darkMode);

  useEffect(() => {
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return <>{children}</>;
}
