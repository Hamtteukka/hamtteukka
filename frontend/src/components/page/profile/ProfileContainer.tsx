'use client';

import { H3 } from '@/components/typography/Heading';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/button/Button';
import { profileTabPanels, profileTabs } from '@/lib/profile';
import { getUserInfo, subscribe, unsubscribe } from '@/service/profile';
import { useUserStore } from '@/store/loginUser';
import { TUser } from '@/types/user';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import EditProfileButton from '@/components/page/profile/EditProfileButton';
import { ModalProvider } from '@/components/context/ModalContext';

const Tabs = dynamic(() => import('@/components/ui/tabs/Tabs'), { ssr: false });

const ProfileContainer: React.FC = () => {
  const pathname = usePathname();
  const userId = pathname.split('/').pop() || '';

  const [userInfo, setUserInfo] = useState<TUser>();
  const [subscriberCount, setSubscriberCount] = useState<number>();
  const [isSubscribed, setIsSubscribed] = useState<boolean>();

  const { userId: myId } = useUserStore();

  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { user, subscriberCount, isSubscribed } = await getUserInfo(userId);
      setUserInfo(user);
      setSubscriberCount(subscriberCount);
      setIsSubscribed(isSubscribed);
    };

    fetchUserInfo();
  }, []);

  const handleSubscribeClick = async () => {
    if (userInfo) {
      setIsFetching(true);
      const { subscriberCount, isSubscribed } = await subscribe(Number(userId));
      setSubscriberCount(subscriberCount);
      setIsSubscribed(isSubscribed);
      setIsFetching(false);
    } else {
      alert('해당 유저가 존재하지 않습니다.');
    }
  };

  const handleUnsubscribeClick = async () => {
    if (userInfo) {
      setIsFetching(true);
      const { subscriberCount, isSubscribed } = await unsubscribe(Number(userId));
      setSubscriberCount(subscriberCount);
      setIsSubscribed(isSubscribed);
      setIsFetching(false);
    } else {
      alert('해당 유저가 존재하지 않습니다.');
    }
  };

  return (
    <>
      {userInfo && (
        <div>
          <section className='flex gap-14 py-6'>
            <Avatar src={userInfo.profileId} size='lg' />

            <div className='flex flex-col justify-between'>
              <H3>{userInfo.nickname}</H3>
              <div>구독자 {subscriberCount}명</div>
              {isFetching ? (
                <Button>
                  <ClipLoader color='white' size={24} />
                </Button>
              ) : myId === Number(userId) ? (
                <ModalProvider>
                  <EditProfileButton />
                </ModalProvider>
              ) : isSubscribed ? (
                <Button onClick={handleUnsubscribeClick} type='outlined'>
                  구독 취소
                </Button>
              ) : (
                <Button onClick={handleSubscribeClick}>구독하기</Button>
              )}
            </div>
          </section>

          <Tabs tabList={profileTabs} tabPanels={profileTabPanels} />
        </div>
      )}
    </>
  );
};

export default ProfileContainer;
