import PatternTypeContext from '@/components/context/PatternTypeContext';
import { useContext } from 'react';

export const useSetPatternTypeContext = () => {
  const setPatterType = useContext(PatternTypeContext);
  if (!setPatterType) {
    throw new Error('useSetPatternTypeContext는 SetPatternTypeProvider 내부에서 사용되어야 합니다.');
  }

  return setPatterType;
};
