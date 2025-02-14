import { SUCCESS } from '@/lib/constants/service';
import { newFeed } from '@/service/api';
import { TPatternPost } from '@/types/pattern';
import { TFeedId, TFeedPreview } from '@/types/post';
import { TCursorData } from '@/types/service';

export const createFeed = async (formData: FormData): Promise<TFeedId> => {
  const { status, message, data } = await newFeed.createFeed(formData);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};

export const createAIFeed = async (patternPost: TPatternPost): Promise<TFeedId> => {
  const { status, message, data } = await newFeed.createAIFeed(patternPost);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};

export const getAIPatternPostList = async (cursorId: number, limit: number): Promise<TCursorData<TFeedPreview>> => {
  const { status, message, data } = await newFeed.getAIPatternPostList(cursorId, limit);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};
