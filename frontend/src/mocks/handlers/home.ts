import { MockRestClient } from '@/mocks/mockRestClient';
import { getMPostList } from '@/mocks/util/home';

export const handlers = [MockRestClient.get('/api/feeds', getMPostList)];
