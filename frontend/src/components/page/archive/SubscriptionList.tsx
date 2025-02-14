'use client';

import NoDataIndicator from '@/components/ui/NoDataIndicator';
import SubscriptionProfile from '@/components/ui/profile/SubscriptionProfile';
import { getSubscriptionList } from '@/service/archive';
import { TSubscriptionProfile } from '@/types/archive';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

const SubscriptionList: React.FC = () => {
  const [subscriptionList, setSubscriptionList] = useState<TSubscriptionProfile[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const fetchSubscriptionList = async () => {
      setIsFetching(true);
      const subscriptionList = await getSubscriptionList();
      setSubscriptionList(subscriptionList);
      setIsFetching(false);
    };
    fetchSubscriptionList();
  }, []);

  return (
    <>
      {isFetching ? (
        <div className='flex w-full justify-center'>
          <SyncLoader color='var(--primary)' size={8} />
        </div>
      ) : subscriptionList.length === 0 ? (
        <NoDataIndicator />
      ) : (
        <section className='grid grid-cols-1 gap-10 px-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
          {subscriptionList.map((item) => (
            <Link key={item.user.userId} href={`/profile/${item.user.userId}`}>
              <SubscriptionProfile info={item} />
            </Link>
          ))}
        </section>
      )}
    </>
  );
};

export default SubscriptionList;
