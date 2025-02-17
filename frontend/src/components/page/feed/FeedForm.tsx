'use client';

import { TFeedInfo } from '@/types/post';
import { useEffect, useState } from 'react';
import FeedImageForm from './FeedImageForm';
import FeedContentForm from './FeedContentForm';
import { usePathname } from 'next/navigation';
import { getFeedInfo } from '@/service/feed';

const FeedForm: React.FC = () => {
  const pathname = usePathname();
  const feedId = pathname.split('/').pop() || '';

  const [feedInfo, setFeedInfo] = useState<TFeedInfo>();

  useEffect(() => {
    const fetchFeedInfo = async () => {
      const feedInfo = await getFeedInfo(feedId);
      setFeedInfo(feedInfo);
    };

    fetchFeedInfo();
  }, []);

  return (
    <>
      {feedInfo && <FeedImageForm feedInfo={feedInfo} />}
      {feedInfo && <FeedContentForm feedInfo={feedInfo} />}
    </>
  );
};

export default FeedForm;
