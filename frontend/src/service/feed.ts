import { SUCCESS } from '@/lib/constants/service';
import { feed } from '@/service/api';
import { TFeedInfo, TScrap } from '@/types/post';

export const getFeedInfo = async (feedId: string): Promise<TFeedInfo> => {
  const { status, message, data } = await feed.getFeedInfo(feedId);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};

export const scrapFeed = async (feedId: number, isScrap: boolean): Promise<TScrap> => {
  const { status, message, data } = await feed.scrapFeed(feedId, isScrap);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};
