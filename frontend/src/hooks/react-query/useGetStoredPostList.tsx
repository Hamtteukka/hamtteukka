import { queryKey } from '@/lib/constants/queryKey';
import { POST_LIMIT } from '@/lib/constants/service';
import { getStoredPostList } from '@/service/archive';
import { TCursorData } from '@/types/service';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetStoredPostList = () => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [queryKey.STORED_POST],
    queryFn: ({ pageParam }) => getStoredPostList(pageParam, POST_LIMIT),
    initialPageParam: -1,
    getNextPageParam: (lastPage: TCursorData<TPostPreview>) => (lastPage?.hasNextItems ? lastPage?.nextCursorId : null),
  });

  return { data, isFetching, fetchNextPage, hasNextPage };
};
