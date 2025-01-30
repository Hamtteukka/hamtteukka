import { MockRestClient } from '@/mocks/mockRestClient';
import { getKakaoToken, signUp } from '@/mocks/util/auth';

export const handlers = [
  MockRestClient.post('/api/auth/kakao', getKakaoToken),
  MockRestClient.post('/api/auth/signup', signUp),
];
