import { queryKey } from '@/lib/constants/queryKey';
import { POST_LIMIT } from '@/lib/constants/service';
import { getUserPatternList, getUserPostList } from '@/service/profile';
import { TFeedPreview } from '@/types/post';
import { TCursorData } from '@/types/service';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetUserPostList = (type: 'userPost' | 'userPattern', userId: string) => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [type === 'userPost' ? queryKey.USER_POST : queryKey.USER_PATTERN],
    queryFn: ({ pageParam }) =>
      type === 'userPost'
        ? getUserPostList(userId, pageParam, POST_LIMIT)
        : getUserPatternList(userId, pageParam, POST_LIMIT),
    initialPageParam: -1,
    getNextPageParam: (lastPage: TCursorData<TFeedPreview>) => (lastPage?.hasNextItems ? lastPage?.nextCursorId : null),
  });

  return { data, isFetching, fetchNextPage, hasNextPage };
};
