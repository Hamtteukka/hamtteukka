'use client';

import PostPreview from '@/components/page/post/PostPreview';
import { useGetStoredPostList } from '@/hooks/react-query/useGetStoredPostList';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import SyncLoader from 'react-spinners/SyncLoader';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const StoredPostList: React.FC = () => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useGetStoredPostList();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className='flex flex-col gap-6'>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {data?.pages.flatMap((page) => page.items.map((post) => <PostPreview key={post.feedId} info={post} />))}
        </Masonry>
      </ResponsiveMasonry>
      <div ref={ref} className='self-center'>
        <SyncLoader color='var(--primary)' />
      </div>
    </div>
  );
};

export default StoredPostList;
