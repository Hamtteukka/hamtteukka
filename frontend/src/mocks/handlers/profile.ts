import { MUserId } from '@/mocks/data/user';
import { MockRestClient } from '@/mocks/mockRestClient';
import { getMPostList } from '@/mocks/util/home';
import { getMUserInfo } from '@/mocks/util/profile';

export const handlers = [
  MockRestClient.get(`/api/users/${MUserId.userId}`, getMUserInfo),
  MockRestClient.get(`/api/feeds/${MUserId.userId}/list`, getMPostList),
  MockRestClient.get(`/api/feeds/${MUserId.userId}/ai-list`, getMPostList),
];
