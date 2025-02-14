import { queryKey } from '@/lib/constants/queryKey';
import { POST_LIMIT } from '@/lib/constants/service';
import { getAIPatternPostList } from '@/service/newFeed';
import { TFeedPreview } from '@/types/post';
import { TCursorData } from '@/types/service';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetAIPatternPostList = () => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [queryKey.AI_PATTERN],
    queryFn: ({ pageParam }) => getAIPatternPostList(pageParam, POST_LIMIT),
    initialPageParam: -1,
    getNextPageParam: (lastPage: TCursorData<TFeedPreview>) => (lastPage?.hasNextItems ? lastPage?.nextCursorId : null),
  });

  return { data, isFetching, fetchNextPage, hasNextPage };
};
