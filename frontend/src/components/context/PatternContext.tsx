'use client';

import { TDotPattern, TTextPattern } from '@/types/pattern';
import React, { createContext, useState } from 'react';

interface PPattern {
  textPattern: TTextPattern;
  setTextPattern: (textPattern: TTextPattern) => void;
  dotPattern: TDotPattern;
  setDotPattern: (dotPattern: TDotPattern) => void;
}

export const PatternContext = createContext<PPattern | undefined>(undefined);

export const PatternProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textPattern, setTextPattern] = useState<TTextPattern>({ description: '', expectedImage: '' });
  const [dotPattern, setDotPattern] = useState<TDotPattern>({ dotImage: '' });

  return (
    <PatternContext.Provider value={{ textPattern, setTextPattern, dotPattern, setDotPattern }}>
      {children}
    </PatternContext.Provider>
  );
};
