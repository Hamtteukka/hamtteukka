import { VIDEO_USER_ROLE } from '@/lib/constants/knitogether';
import { TUser, TVideoUser } from '@/types/user';

export const MUser: TUser = {
  userId: '1',
  nickname: '설핢',
  profileImage: '/image/profile.png',
};

export const MVideoUser: TVideoUser = {
  ...MUser,
  role: VIDEO_USER_ROLE.HOST,
};
