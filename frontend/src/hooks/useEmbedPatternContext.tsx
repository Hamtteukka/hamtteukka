import { useContext } from 'react';
import { EmbedPatternContext } from '@/components/context/EmbedPatternContext';

export const useEmbedPatternContext = () => {
  const context = useContext(EmbedPatternContext);
  if (!context) {
    throw new Error('useEmbedPatternContext은 EmbedPatternProvider 내부에서 사용되어야 합니다.');
  }
  return context;
};
