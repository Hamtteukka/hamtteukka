import { queryKey } from '@/lib/constants/queryKey';
import { POST_LIMIT } from '@/lib/constants/service';
import { getSearchedPostList } from '@/service/\bsearch';
import { TFeedPreview } from '@/types/post';
import { TCursorData } from '@/types/service';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetSearchedPostList = (keyword: string, categoryIds: string) => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [queryKey.SEARCH_POST, keyword, categoryIds],
    queryFn: ({ pageParam }) => getSearchedPostList(pageParam, POST_LIMIT, keyword, categoryIds),
    initialPageParam: -1,
    getNextPageParam: (lastPage: TCursorData<TFeedPreview>) => (lastPage?.hasNextItems ? lastPage?.nextCursorId : null),
  });

  return { data, isFetching, fetchNextPage, hasNextPage };
};
