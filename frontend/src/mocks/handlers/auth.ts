import { MockRestClient } from '@/mocks/mockRestClient';
import { getKakaoToken } from '@/mocks/util/auth';

export const handlers = [MockRestClient.post('/api/auth/kakao', getKakaoToken)];
