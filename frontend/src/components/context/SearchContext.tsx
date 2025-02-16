'use client';

import { useCheckboxButton } from '@/hooks/useCheckboxButton';
import useTextInput from '@/hooks/useTextInput';
import { TCraftTypeKr, TNeedle } from '@/types/pattern';
import React, { createContext, useState } from 'react';

interface PSearchContext {
  keyword: string;
  needle: TNeedle | undefined;
  crafts: TCraftTypeKr[];
  setKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setNeedle: React.Dispatch<React.SetStateAction<TNeedle | undefined>>;
  addCraft: (value: TCraftTypeKr) => void;
  removeCraft: (value: TCraftTypeKr) => void;
}

export const SearchContext = createContext<PSearchContext | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [keyword, setKeyword] = useTextInput('');
  const [needle, setNeedle] = useState<TNeedle>();
  const { values: crafts, addValue: addCraft, removeValue: removeCraft } = useCheckboxButton<TCraftTypeKr>();

  return (
    <SearchContext.Provider value={{ keyword, needle, crafts, setKeyword, setNeedle, addCraft, removeCraft }}>
      {children}
    </SearchContext.Provider>
  );
};
