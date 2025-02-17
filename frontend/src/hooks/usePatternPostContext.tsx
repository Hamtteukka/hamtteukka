import { PatternPostContext } from '@/components/context/PatternPostContext';
import { useContext } from 'react';

export const usePatternPostContext = () => {
  const patternPostContext = useContext(PatternPostContext);
  if (!patternPostContext) {
    throw new Error('usePatternPostContext PatternPostProvider 내부에서 사용되어야 합니다.');
  }

  return patternPostContext;
};
