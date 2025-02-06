import { VIDEO_USER_ROLE } from '@/lib/constants/knitogether';
import { TAuthRedirectUrl } from '@/types/service';

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

export type TUserRedirectUrl = TUser & TAuthRedirectUrl;
