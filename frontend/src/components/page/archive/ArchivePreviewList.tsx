'use client';

import PostPreview from '@/components/page/post/PostPreview';
import { useGetStoredPostList } from '@/hooks/react-query/useGetStoredPostList';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import SyncLoader from 'react-spinners/SyncLoader';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import NoDataIndicator from '@/components/ui/NoDataIndicator';

interface PArchivePreviewList {
  type: 'post' | 'pattern';
}

const ArchivePreviewList: React.FC<PArchivePreviewList> = ({ type }) => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useGetStoredPostList(type);

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
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4, 1500: 5 }}>
            <Masonry>
              {data?.pages.flatMap((page) => page.items.map((post) => <PostPreview key={post.feedId} info={post} />))}
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

export default ArchivePreviewList;
