import { VIDEO_USER_ROLE } from '@/lib/constants/knitogether';

type TRole = (typeof VIDEO_USER_ROLE)[keyof typeof VIDEO_USER_ROLE];

export interface TUser {
  userId: string;
  role: TRole;
  nickname: string;
  imageUrl: string;
}
