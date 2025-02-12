import { MUserId } from '@/mocks/data/user';
import { MockRestClient } from '@/mocks/mockRestClient';
import { getMPostList } from '@/mocks/util/home';

export const handlers = [
  MockRestClient.get(`/api/feeds/${MUserId.userId}/list`, getMPostList),
  MockRestClient.get(`/api/feeds/${MUserId.userId}/ai-list`, getMPostList),
];
