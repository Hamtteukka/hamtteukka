import { queryKey } from '@/lib/constants/queryKey';
import { POST_LIMIT } from '@/lib/constants/service';
import { getPostList } from '@/service/home';
import { TFeedPreview } from '@/types/post';
import { TCursorData } from '@/types/service';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetPostList = () => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [queryKey.HOME_POST],
    queryFn: ({ pageParam }) => getPostList(pageParam, POST_LIMIT),
    initialPageParam: -1,
    getNextPageParam: (lastPage: TCursorData<TFeedPreview>) => (lastPage?.hasNextItems ? lastPage?.nextCursorId : null),
  });

  return { data, isFetching, fetchNextPage, hasNextPage };
};
