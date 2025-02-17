import { queryKey } from '@/lib/constants/queryKey';
import { POST_LIMIT } from '@/lib/constants/service';
import { getStoredPatternList, getStoredPostList } from '@/service/archive';
import { TFeedPreview } from '@/types/post';
import { TCursorData } from '@/types/service';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetStoredPostList = (type: 'post' | 'pattern') => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [type === 'post' ? queryKey.STORED_POST : queryKey.STORED_PATTERN],
    queryFn: ({ pageParam }) =>
      type === 'post' ? getStoredPostList(pageParam, POST_LIMIT) : getStoredPatternList(pageParam, POST_LIMIT),
    initialPageParam: -1,
    getNextPageParam: (lastPage: TCursorData<TFeedPreview>) => (lastPage?.hasNextItems ? lastPage?.nextCursorId : null),
  });

  return { data, isFetching, fetchNextPage, hasNextPage };
};
