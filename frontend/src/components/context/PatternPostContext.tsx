'use client';

import useTextInput from '@/hooks/useTextInput';
import { NEEDLE_TYPE } from '@/lib/constants/pattern';
import { TCraftTypeKr, TNeedle } from '@/types/pattern';
import React, { createContext, useState } from 'react';

interface PPatternPost {
  needle: TNeedle;
  craft: TCraftTypeKr | undefined;
  setNeedle: React.Dispatch<React.SetStateAction<TNeedle>>;
  setCraft: React.Dispatch<React.SetStateAction<TCraftTypeKr | undefined>>;
}

export const PatternPostContext = createContext<PPatternPost | undefined>(undefined);

export const PatternPostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [needle, setNeedle] = useState<TNeedle>(NEEDLE_TYPE.KNITTING);
  const [craft, setCraft] = useState<TCraftTypeKr>();

  return (
    <PatternPostContext.Provider value={{ needle, craft, setNeedle, setCraft }}>{children}</PatternPostContext.Provider>
  );
};
