'use client';

import { useState, useEffect, ReactNode } from 'react';

interface HydrateWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function HydrateWrapper({ children, fallback = null }: HydrateWrapperProps) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
