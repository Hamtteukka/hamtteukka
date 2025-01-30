import { SUCCESS } from '@/lib/constants/service';
import { auth } from '@/service/api';
import { TAuthRedirectUrl } from '@/types/service';
import { TUser } from '@/types/user';

export const getKakaoToken = async (code: string): Promise<TAuthRedirectUrl> => {
  const { status, message, data } = await auth.getKakaoToken(code);
  if (status !== SUCCESS) new Error(message);

  return data;
};

export const signUp = async (formData: FormData): Promise<TUser> => {
  const { status, message, data } = await auth.signUp(formData);
  if (status !== SUCCESS) new Error(message);

  return data;
};
