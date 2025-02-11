import { MockRestClient } from '@/mocks/mockRestClient';
import { getMStoredPostList, getMSubscriptionList } from '@/mocks/util/archive';

export const handlers = [
  MockRestClient.get('/api/feeds/saved-list', getMStoredPostList),
  MockRestClient.get('/api/feeds/saved-ai-list', getMStoredPostList),
  MockRestClient.get('/api/users/subscription', getMSubscriptionList),
];
