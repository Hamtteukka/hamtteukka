import { SUCCESS } from '@/lib/constants/service';
import { archive } from '@/service/api';
import { TSubscriptionProfile } from '@/types/archive';
import { TFeedPreview } from '@/types/post';
import { TCursorData } from '@/types/service';

export const getSubscriptionList = async (): Promise<TSubscriptionProfile[]> => {
  const { status, message, data } = await archive.getSubscriptionList();
  if (status !== SUCCESS) throw new Error(message);

  return data;
};

export const getStoredPostList = async (cursorId: number, limit: number): Promise<TCursorData<TFeedPreview>> => {
  const { status, message, data } = await archive.getStoredPostList(cursorId, limit);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};

export const getStoredPatternList = async (cursorId: number, limit: number): Promise<TCursorData<TFeedPreview>> => {
  const { status, message, data } = await archive.getStoredPatternList(cursorId, limit);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};
