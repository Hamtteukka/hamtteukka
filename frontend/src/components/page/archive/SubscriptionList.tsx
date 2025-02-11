'use client';

import SubscriptionProfile from '@/components/ui/profile/SubscriptionProfile';
import { getSubscriptionList } from '@/service/archive';
import { TSubscriptionProfile } from '@/types/archive';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SubscriptionList: React.FC = () => {
  const [subscriptionList, setSubscriptionList] = useState<TSubscriptionProfile[]>([]);

  useEffect(() => {
    const fetchSubscriptionList = async () => {
      const subscriptionList = await getSubscriptionList();
      setSubscriptionList(subscriptionList);
    };
    fetchSubscriptionList();
  }, []);

  return (
    <section className='grid grid-cols-1 gap-10 px-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
      {subscriptionList.map((item) => (
        <Link key={item.user.userId} href={`/profile/${item.user.userId}`}>
          <SubscriptionProfile info={item} />
        </Link>
      ))}
    </section>
  );
};

export default SubscriptionList;
