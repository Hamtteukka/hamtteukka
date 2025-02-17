import { SUCCESS } from '@/lib/constants/service';
import { feed } from '@/service/api';
import { TFeedInfo } from '@/types/post';

export const getFeedInfo = async (feedId: string): Promise<TFeedInfo> => {
  const { status, message, data } = await feed.getFeedInfo(feedId);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};
