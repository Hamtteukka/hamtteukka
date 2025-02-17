import { MFeedId } from '@/mocks/data/feed';
import { MockRestClient } from '@/mocks/mockRestClient';
import { getMFeedInfo, scrapFeed } from '@/mocks/util/feed';

export const handlers = [
  MockRestClient.get(`/api/feeds/${MFeedId.feedId}`, getMFeedInfo),
  MockRestClient.post('/api/feeds/scrap', scrapFeed),
];
