'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import QuoteTool from './QuoteTool';

type QuoteContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <QuoteContext.Provider
      value={{ open: () => setIsOpen(true), close: () => setIsOpen(false), isOpen }}
    >
      {children}
      <QuoteTool open={isOpen} onClose={() => setIsOpen(false)} />
    </QuoteContext.Provider>
  );
}

export function useQuoteTool() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuoteTool must be used within QuoteProvider');
  return ctx;
}
