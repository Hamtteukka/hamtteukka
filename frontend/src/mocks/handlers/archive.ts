import { MockRestClient } from '@/mocks/mockRestClient';
import { getMStoredPostList } from '@/mocks/util/archive';

export const handlers = [
  MockRestClient.get('/api/feeds/saved-list', getMStoredPostList),
  MockRestClient.get('/api/feeds/saved-ai-list', getMStoredPostList),
];
