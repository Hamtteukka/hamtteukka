import { MockRestClient } from '@/mocks/mockRestClient';
import { createFeed, getAIPatternPostList } from '@/mocks/util/newFeed';

export const handlers = [
  MockRestClient.post('/api/feeds', createFeed),
  MockRestClient.get('/api/feeds/ai-embed', getAIPatternPostList),
];
