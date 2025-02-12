'use client';

import { H3 } from '@/components/typography/Heading';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/button/Button';
import { profileTabPanels, profileTabs } from '@/lib/profile';
import { useUserStore } from '@/store/loginUser';
import dynamic from 'next/dynamic';

const Tabs = dynamic(() => import('@/components/ui/tabs/Tabs'), { ssr: false });

const ProfileContainer: React.FC = () => {
  const { nickname, profileId } = useUserStore();

  const fetchUserInfo = () => {
    // TODO: 유저 정보 조회 API 요청
  };

  const subscribe = () => {
    // TODO: 구독 API 요청
  };

  return (
    <div>
      <div className='flex gap-14 py-6'>
        <Avatar src={profileId} size='lg' />
        <div className='flex flex-col justify-between'>
          <H3>{nickname}</H3>
          <div>구독자 16명</div>
          <Button onClick={subscribe}>구독하기</Button>
        </div>
      </div>
      <Tabs tabList={profileTabs} tabPanels={profileTabPanels} />
    </div>
  );
};

export default ProfileContainer;
