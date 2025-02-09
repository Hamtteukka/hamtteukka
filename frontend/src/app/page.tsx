import HomePostList from '@/components/page/home/HomePostList';
import { Hydrate } from '@/components/ReactQuery';
import { queryKey } from '@/lib/constants/queryKey';
import { POST_LIMIT } from '@/lib/constants/service';
import { getPostList } from '@/service/home';
import getQueryClient from '@/util/react-query/getQueryClient';
import { dehydrate } from '@tanstack/react-query';

const Home: React.FC = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKey.HOME_POST],
    queryFn: ({ pageParam }) => getPostList(pageParam, POST_LIMIT),
    initialPageParam: -1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <HomePostList />
    </Hydrate>
  );
};

export default Home;
