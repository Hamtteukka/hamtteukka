import { VIDEO_USER_ROLE } from '@/lib/constants/knitogether';
import { TSubscriptionUser, TUser, TVideoUser } from '@/types/user';

export const MUserId = {
  userId: 1,
};

export const MUser: TUser = {
  userId: 1,
  nickname: '설핢',
  profileId: '/image/profile.png',
  dailyCreationLimit: 3,
};

export const MVideoUser: TVideoUser = {
  ...MUser,
  role: VIDEO_USER_ROLE.HOST,
};

export const MSubscriptionInfo: TSubscriptionUser = {
  user: MUser,
  subscriberCount: 10,
  isSubscribed: false,
};
