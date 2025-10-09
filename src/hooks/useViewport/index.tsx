'use client';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface ViewportContextType {
  width: number;
}

export const ViewportContext = createContext<ViewportContextType>({ width: 0 });

interface ViewportProviderProps {
  children: ReactNode;
}

export function ViewportProvider({ children }: ViewportProviderProps) {
  const [width, setWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 0;
  });
  
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <ViewportContext.Provider value={{ width }}>
      {children}
    </ViewportContext.Provider>
  );
}

export function useViewport() {
  const context = React.useContext(ViewportContext);
  if (context === undefined) {
    throw new Error('useViewport must be used within a ViewportProvider');
  }
  return context;
}