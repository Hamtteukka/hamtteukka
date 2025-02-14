'use client';

import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

interface PEmbedPatternContext {
  selectedEmbedPattern: number;
  selectedEmbedPatternImage: string;
  setSelectedEmbedPattern: Dispatch<SetStateAction<number>>;
  setSelectedEmbedPatternImage: Dispatch<SetStateAction<string>>;
}

export const EmbedPatternContext = createContext<PEmbedPatternContext | undefined>(undefined);

export const EmbedPatternProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedEmbedPattern, setSelectedEmbedPattern] = useState<number>(-1);
  const [selectedEmbedPatternImage, setSelectedEmbedPatternImage] = useState<string>('');

  const contextValue: PEmbedPatternContext = {
    selectedEmbedPattern,
    selectedEmbedPatternImage,
    setSelectedEmbedPattern,
    setSelectedEmbedPatternImage,
  };

  return <EmbedPatternContext.Provider value={contextValue}>{children}</EmbedPatternContext.Provider>;
};
