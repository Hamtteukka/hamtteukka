import { MUserId } from '@/mocks/data/user';
import { MockRestClient } from '@/mocks/mockRestClient';
import { getMPostList } from '@/mocks/util/home';
import { editUserInfo, getMUserInfo, subscribe, unsubscribe } from '@/mocks/util/profile';

export const handlers = [
  MockRestClient.get(`/api/users/${MUserId.userId}`, getMUserInfo),
  MockRestClient.put('/api/users', editUserInfo),
  MockRestClient.get(`/api/feeds/${MUserId.userId}/list`, getMPostList),
  MockRestClient.get(`/api/feeds/${MUserId.userId}/ai-list`, getMPostList),
  MockRestClient.post('/api/users/subscribe', subscribe),
  MockRestClient.delete('/api/users/subscribe', unsubscribe),
];
