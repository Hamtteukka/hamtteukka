'use client';

import SelectablePostPreview from '@/components/page/post/SelectablePostPreview';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import SyncLoader from 'react-spinners/SyncLoader';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import NoDataIndicator from '@/components/ui/NoDataIndicator';
import { useGetAIPatternPostList } from '@/hooks/react-query/useGetAIPatternPostList';

const AIPatternPreviewList: React.FC = () => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useGetAIPatternPostList();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className='flex flex-col'>
      <>
        {data?.pages[0].items.length === 0 ? (
          <NoDataIndicator />
        ) : (
          <ResponsiveMasonry>
            <Masonry>
              {data?.pages.flatMap((page) =>
                page.items.map((post) => <SelectablePostPreview key={post.feedId} info={post} />),
              )}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </>
      <div ref={ref} className='self-center'>
        {hasNextPage && <SyncLoader color='var(--primary)' size={8} />}
      </div>
    </div>
  );
};

export default AIPatternPreviewList;
