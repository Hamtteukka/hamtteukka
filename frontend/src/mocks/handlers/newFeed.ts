import { MockRestClient } from '@/mocks/mockRestClient';
import { createFeed } from '@/mocks/util/newFeed';

export const handlers = [MockRestClient.post('/api/feeds', createFeed)];
