'use client';

import UserVideo from '@/components/page/knitogether/video/UserVideo';
import Avatar from '@/components/ui/Avatar';
import Expand from '/public/svg/expandIcon.svg';
import Crown from '/public/svg/crownIcon.svg';
import { TUser } from '@/types/user';
import { Publisher, StreamManager } from 'openvidu-browser';
import { useEffect, useState } from 'react';

interface PUserVideoCard {
  stream: Publisher | StreamManager | undefined;
  host?: string;
  isOn?: boolean;
}

const UserVideoCard: React.FC<PUserVideoCard> = ({ stream, isOn, host }) => {
  const [userInfo, setUserInfo] = useState<TUser>();

  useEffect(() => {
    if (stream) {
      const userInfo = JSON.parse(stream.stream.connection.data);
      setUserInfo(userInfo);
    }
  }, []);

  return (
    <div className='relative flex overflow-hidden rounded-sm'>
      <UserVideo stream={stream} isOn={isOn} />
      <div className='absolute bottom-0 flex w-full justify-between bg-modal p-2'>
        <div className='flex items-center gap-2'>
          <Avatar src={userInfo ? userInfo.profileId : ''} />
          <span className='text-detail font-bold text-white'>{userInfo?.nickname}</span>
          {host === userInfo?.nickname && <Crown />}
        </div>
        <div className='cursor-pointer'>
          <Expand />
        </div>
      </div>
    </div>
  );
};

export default UserVideoCard;
