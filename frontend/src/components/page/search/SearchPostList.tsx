'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import SyncLoader from 'react-spinners/SyncLoader';
import PostPreview from '@/components/page/post/PostPreview';
import NoDataIndicator from '@/components/ui/NoDataIndicator';
import { useSearchParams } from 'next/navigation';
import { useGetSearchedPostList } from '@/hooks/react-query/useGetSearchedPostList';
import { H1 } from '@/components/typography/Heading';
import { categoryIdsToKr } from '@/util/categoryUtils';
import Badge from '@/components/ui/badge/Badge';

const SearchPostList: React.FC = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const categoryIds = searchParams.get('categoryIds') || '';

  const { data, isFetching, fetchNextPage, hasNextPage } = useGetSearchedPostList(keyword, categoryIds);
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
    <div className='flex h-full flex-col gap-5 px-2.5 py-10'>
      {keyword && <H1>'{keyword}' 에 대한 검색 결과</H1>}
      {categoryIds && (
        <div className='flex flex-wrap gap-2'>
          {categoryIdsToKr(categoryIds).map((category) => (
            <Badge>{category}</Badge>
          ))}
        </div>
      )}
      {isClient &&
        (data?.pages[0].items.length === 0 ? (
          <NoDataIndicator />
        ) : (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4, 1500: 5 }}>
            <Masonry>
              {data?.pages.flatMap((page) => page.items.map((post) => <PostPreview key={post.feedId} info={post} />))}
            </Masonry>
          </ResponsiveMasonry>
        ))}
      <div ref={ref} className='self-center'>
        {hasNextPage && <SyncLoader color='var(--primary)' size={8} />}
      </div>
    </div>
  );
};

export default SearchPostList;
