import { VIDEO_USER_ROLE } from '@/lib/constants/knitogether';

type TRole = (typeof VIDEO_USER_ROLE)[keyof typeof VIDEO_USER_ROLE];

export interface TUser {
  nickname: string;
  profileId: string;
  dailyCreationLimit?: number;
  userId?: string;
}

export interface TVideoUser extends TUser {
  role: TRole;
}
