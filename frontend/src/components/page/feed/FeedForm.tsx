'use client';

import { MFeedInfo } from '@/mocks/data/feed';
import { TFeedInfo } from '@/types/post';
import { useEffect, useState } from 'react';
import FeedImageForm from './FeedImageForm';
import FeedContentForm from './FeedContentForm';

const FeedForm: React.FC = () => {
  const [feedInfo, setFeedInfo] = useState<TFeedInfo>(MFeedInfo);

  useEffect(() => {
    const fetchFeedInfo = async () => {
      // const feedInfo = await getFeedInfo();
      setFeedInfo(MFeedInfo);
    };

    fetchFeedInfo();
  }, []);

  return (
    <>
      <FeedImageForm feedInfo={feedInfo} />
      <FeedContentForm feedInfo={feedInfo} />
    </>
  );
};

export default FeedForm;
