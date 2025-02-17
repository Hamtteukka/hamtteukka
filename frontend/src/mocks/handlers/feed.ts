import { MFeedId } from '@/mocks/data/feed';
import { MockRestClient } from '@/mocks/mockRestClient';
import { deleteFeed, getMFeedInfo, scrapFeed } from '@/mocks/util/feed';

export const handlers = [
  MockRestClient.get(`/api/feeds/${MFeedId.feedId}`, getMFeedInfo),
  MockRestClient.delete(`/api/feeds/${MFeedId.feedId}`, deleteFeed),
  MockRestClient.post('/api/feeds/scrap', scrapFeed),
];
