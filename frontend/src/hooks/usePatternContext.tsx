import { PatternContext } from '@/components/context/PatternContext';
import { useContext } from 'react';

export const usePatternContext = () => {
  const patternContext = useContext(PatternContext);
  if (!patternContext) {
    throw new Error('usePatternContext는 PatternProvider 내부에서 사용되어야 합니다.');
  }

  return patternContext;
};
