import { NewFeedContext } from '@/components/context/NewFeedContext';
import { useContext } from 'react';

export const useNewFeedContext = () => {
  const newFeedContext = useContext(NewFeedContext);
  if (!newFeedContext) {
    throw new Error('useNewFeedContext는 NewFeedProvider 내부에서 사용되어야 합니다.');
  }

  return newFeedContext;
};
