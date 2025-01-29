'use client';

import UserVideo from '@/components/page/knitogether/video/UserVideo';
import Avatar from '@/components/ui/Avatar';
import Expand from '/public/svg/expandIcon.svg';
import Crown from '/public/svg/crownIcon.svg';
import { TVideoUser } from '@/types/user';
import { VIDEO_USER_ROLE } from '@/lib/constants/knitogether';

interface PUserVideoCard {
  user: TVideoUser;
}

const UserVideoCard: React.FC<PUserVideoCard> = ({ user: { role, nickname, imageUrl } }) => {
  return (
    <div className='relative overflow-hidden rounded-sm'>
      <UserVideo />
      <div className='absolute bottom-0 flex w-full justify-between bg-modal p-2'>
        <div className='flex items-center gap-2'>
          <Avatar src={imageUrl} />
          <span className='text-detail font-bold text-white'>{nickname}</span>
          {role === VIDEO_USER_ROLE.HOST && <Crown />}
        </div>
        <div className='cursor-pointer'>
          <Expand />
        </div>
      </div>
    </div>
  );
};

export default UserVideoCard;
