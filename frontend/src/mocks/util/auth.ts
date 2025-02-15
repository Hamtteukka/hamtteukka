import { HttpResponse, StrictResponse } from 'msw';
import { MUser } from '@/mocks/data/user';
import { TAuthRedirectUrl, TResponseData } from '@/types/service';
import { TUser } from '@/types/user';

export const getKakaoToken = async (): Promise<StrictResponse<TResponseData<TAuthRedirectUrl>>> => {
  const redirectUrl = 'http://localhost:3000/auth/signup';

  return HttpResponse.json({
    status: 'success',
    message: '유효한 카카오 유저입니다.',
    data: { url: redirectUrl },
  });
};

export const signUp = async (): Promise<StrictResponse<TResponseData<TUser>>> => {
  return HttpResponse.json({
    status: 'success',
    message: '회원가입에 성공하였습니다.',
    data: MUser,
  });
};
