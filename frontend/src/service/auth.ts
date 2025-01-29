import { SUCCESS } from '@/lib/constants/service';
import { auth } from '@/service/api';
import { TUser } from '@/types/user';

export const getKakaoToken = async (code: string) => {
  const response = await auth.getKakaoToken(code);
  if (!response) new Error('카카오 인가 코드가 유효하지 않습니다.');
};

export const signUp = async (body: TUser): Promise<TUser> => {
  const { status, message, data } = await auth.signUp(body);
  if (status !== SUCCESS) new Error(message);

  return data;
};
