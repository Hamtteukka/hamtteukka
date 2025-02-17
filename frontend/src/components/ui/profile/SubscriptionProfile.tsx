import { cn } from '@/lib/utils';
import { TSubscriptionProfile } from '@/types/archive';
import Avatar from '@/components/ui/Avatar';

interface PSubscriptionProfile {
  info: TSubscriptionProfile;
  className?: string;
}

const SubscriptionProfile: React.FC<PSubscriptionProfile> = ({
  info: {
    user: { nickname, profileId },
    subscriber,
  },
  className = '',
}) => {
  return (
    <div className={cn('flex grow flex-col items-center gap-2.5', className)}>
      <Avatar src={profileId} size='lg' />
      <p className='font-bold'>{nickname}</p>
      <p className='text-detail'>구독자 {subscriber}명</p>
    </div>
  );
};

export default SubscriptionProfile;
