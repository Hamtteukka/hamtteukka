import { HttpResponse, delay } from 'msw';

export const getKakaoToken = async (): Promise<Response> => {
  const redirectUrl = 'http://localhost:3000/auth/signup';

  await delay(3000);

  return HttpResponse.redirect(redirectUrl, 301);
};
