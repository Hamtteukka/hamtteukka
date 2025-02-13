import { VIDEO_USER_ROLE } from '@/lib/constants/knitogether';

type TRole = (typeof VIDEO_USER_ROLE)[keyof typeof VIDEO_USER_ROLE];

export interface TUser {
  userId: number;
  nickname: string;
  profileId: string;
  dailyCreationLimit?: number;
  isLogin?: boolean;
}

export interface TVideoUser extends TUser {
  role: TRole;
}

export interface TSubscription {
  subscriberCount: number;
  isSubscribed: boolean;
}

export interface TSubscriptionUser extends TSubscription {
  user: TUser;
}
