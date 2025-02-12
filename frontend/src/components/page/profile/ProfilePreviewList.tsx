'use client';

import PostPreview from '@/components/page/post/PostPreview';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import SyncLoader from 'react-spinners/SyncLoader';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useGetUserPostList } from '@/hooks/react-query/useGetUserPostList';
import { usePathname } from 'next/navigation';

interface PProfilePreviewList {
  type: 'userPost' | 'userPattern';
}

const ProfilePreviewList: React.FC<PProfilePreviewList> = ({ type }) => {
  const pathname = usePathname();
  const userId = pathname.split('/').pop() || '';

  const { data, isFetching, fetchNextPage, hasNextPage } = useGetUserPostList(type, userId);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className='flex flex-col'>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4, 1500: 5 }}>
        <Masonry>
          {data?.pages.flatMap((page) => page.items.map((post) => <PostPreview key={post.feedId} info={post} />))}
        </Masonry>
      </ResponsiveMasonry>
      <div ref={ref} className='self-center'>
        <SyncLoader color='var(--primary)' size={8} />
      </div>
    </div>
  );
};

export default ProfilePreviewList;
