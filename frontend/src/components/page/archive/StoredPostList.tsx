'use client';

import { useGetStoredPostList } from '@/hooks/react-query/useGetStoredPostList';
import { Fragment } from 'react';

const StoredPostList: React.FC = () => {
  const { data, isPending, isError, fetchNextPage, hasNextPage } = useGetStoredPostList();

  return (
    <div className='flex flex-col'>
      <button onClick={() => hasNextPage && fetchNextPage()}>fetch next page</button>
      {data?.pages.map((page) => (
        <Fragment key={page.items[0].feedId}>
          {page.items.map((post) => (
            <div>{post.title}</div>
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default StoredPostList;
