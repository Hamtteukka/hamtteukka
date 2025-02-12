'use client';

import { H3 } from '@/components/typography/Heading';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/button/Button';
import { profileTabPanels, profileTabs } from '@/lib/profile';
import { getUserInfo } from '@/service/profile';
import { TUser } from '@/types/user';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Tabs = dynamic(() => import('@/components/ui/tabs/Tabs'), { ssr: false });

const ProfileContainer: React.FC = () => {
  const pathname = usePathname();
  const userId = pathname.split('/').pop() || '';

  const [userInfo, setUserInfo] = useState<TUser>();
  const [subscriberCount, setSubscriberCount] = useState<number>();
  const [isSubscribed, setIsSubscribed] = useState<boolean>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { user, subscriberCount, isSubscribed } = await getUserInfo(userId);
      setUserInfo(user);
      setSubscriberCount(subscriberCount);
      setIsSubscribed(isSubscribed);
    };

    fetchUserInfo();
  }, []);

  const subscribe = () => {
    // TODO: 구독 API 요청
  };

  return (
    <>
      {userInfo && (
        <div>
          <div className='flex gap-14 py-6'>
            <Avatar src={userInfo.profileId} size='lg' />
            <div className='flex flex-col justify-between'>
              <H3>{userInfo.nickname}</H3>
              <div>구독자 {subscriberCount}명</div>
              <Button onClick={subscribe}>구독하기</Button>
            </div>
          </div>
          <Tabs tabList={profileTabs} tabPanels={profileTabPanels} />
        </div>
      )}
    </>
  );
};

export default ProfileContainer;
