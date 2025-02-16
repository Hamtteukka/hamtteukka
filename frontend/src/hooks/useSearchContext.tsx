import { SearchContext } from '@/components/context/SearchContext';
import { useContext } from 'react';

export const useSearchContext = () => {
  const searchContext = useContext(SearchContext);
  if (!searchContext) {
    throw new Error('useSearchContext은 SearchProvider 내부에서 사용되어야 합니다.');
  }

  return searchContext;
};
