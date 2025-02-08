import SubscriptionProfile from '@/components/ui/profile/SubscriptionProfile';
import { MSubscriptionList } from '@/mocks/data/archive';
import Link from 'next/link';

const SubscriptionList: React.FC = () => {
  return (
    <section className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
      {MSubscriptionList.map((item) => (
        <Link key={item.userId} href={`/profile/${item.userId}`}>
          <SubscriptionProfile info={item} />
        </Link>
      ))}
    </section>
  );
};

export default SubscriptionList;
