'use client';

import UserVideo from '@/components/page/knitogether/video/UserVideo';
import Avatar from '@/components/ui/Avatar';
import Expand from '/public/svg/expandIcon.svg';
import Crown from '/public/svg/crownIcon.svg';
import { TVideoUser } from '@/types/user';
import { VIDEO_USER_ROLE } from '@/lib/constants/knitogether';
import { Publisher } from 'openvidu-browser';

interface PUserVideoCard {
  user: TVideoUser;
  stream: Publisher;
}

const UserVideoCard: React.FC<PUserVideoCard> = ({ user: { role, nickname, profileId }, stream }) => {
  return (
    <div className='relative overflow-hidden rounded-sm'>
      <UserVideo stream={stream} />
      <div className='absolute bottom-0 flex w-full justify-between bg-modal p-2'>
        <div className='flex items-center gap-2'>
          <Avatar src={profileId} />
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
