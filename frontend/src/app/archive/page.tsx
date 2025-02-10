import Archive from '@/components/page/archive/Archive';
import { Hydrate } from '@/components/ReactQuery';
import { H1 } from '@/components/typography/Heading';
import { queryKey } from '@/lib/constants/queryKey';
import { POST_LIMIT } from '@/lib/constants/service';
import { getStoredPostList } from '@/service/archive';
import getQueryClient from '@/util/react-query/getQueryClient';
import { dehydrate } from '@tanstack/react-query';

const page: React.FC = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKey.STORED_POST],
    queryFn: ({ pageParam }) => getStoredPostList(pageParam, POST_LIMIT),
    initialPageParam: -1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className='mx-auto flex flex-col gap-8 px-10 py-10'>
      <H1>아카이브</H1>
      <Hydrate state={dehydratedState}>
        <Archive />
      </Hydrate>
    </div>
  );
};

export default page;
