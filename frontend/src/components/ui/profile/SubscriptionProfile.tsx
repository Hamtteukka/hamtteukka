import Image from 'next/image';
import defaultImg from '/public/logo/logo.png';
import { cn } from '@/lib/utils';
import { TSubscriptionProfile } from '@/types/archive';

interface PSubscriptionProfile {
  info: TSubscriptionProfile;
  className?: string;
}

const SubscriptionProfile: React.FC<PSubscriptionProfile> = ({
  info: { nickname, subscriber, profileImage },
  className = '',
}) => {
  return (
    <div className={cn('flex w-full flex-col items-center gap-2.5', className)}>
      <div className='relative w-full pb-[100%]'>
        <Image
          className='rounded-full object-cover'
          src={profileImage === '' ? defaultImg : profileImage}
          alt='프로필 이미지'
          fill
        />
      </div>
      <p className='font-bold'>{nickname}</p>
      <p className='text-detail'>구독자 {subscriber}명</p>
    </div>
  );
};

export default SubscriptionProfile;
