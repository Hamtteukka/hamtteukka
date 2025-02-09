'use client';

import { useGetPostList } from '@/hooks/react-query/useGetPostList';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import SyncLoader from 'react-spinners/SyncLoader';
import PostPreview from '@/components/page/post/PostPreview';

const HomePostList: React.FC = () => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useGetPostList();
  const [isClient, setIsClient] = useState(false);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className='flex flex-col px-2.5'>
      {isClient && (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4, 1500: 5 }}>
          <Masonry>
            {data?.pages.flatMap((page) => page.items.map((post) => <PostPreview key={post.feedId} info={post} />))}
          </Masonry>
        </ResponsiveMasonry>
      )}
      <div ref={ref} className='self-center'>
        <SyncLoader color='var(--primary)' size={8} />
      </div>
    </div>
  );
};

export default HomePostList;
