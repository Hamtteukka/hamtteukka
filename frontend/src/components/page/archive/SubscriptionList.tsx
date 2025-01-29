import SubscriptionProfile from '@/components/ui/profile/SubscriptionProfile';
import { MSubscriptionList } from '@/mocks/data/archive';
import Link from 'next/link';

const SubscriptionList: React.FC = () => {
  return (
    <section className='grid grid-cols-4 gap-16'>
      {MSubscriptionList.map((item) => (
        <Link key={item.userId} href={`/profile/${item.userId}`}>
          <SubscriptionProfile info={item} />
        </Link>
      ))}
    </section>
  );
};

export default SubscriptionList;
