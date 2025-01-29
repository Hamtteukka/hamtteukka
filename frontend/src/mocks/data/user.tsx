import { VIDEO_USER_ROLE } from '@/lib/constants/knitogether';
import { TVideoUser } from '@/types/user';

export const MVideoUser: TVideoUser = {
  userId: '1',
  nickname: '설핢',
  imageUrl: '/image/profile.png',
  role: VIDEO_USER_ROLE.HOST,
};
