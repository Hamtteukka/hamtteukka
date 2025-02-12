import { SUCCESS } from '@/lib/constants/service';
import { profile } from '@/service/api';
import { TCursorData } from '@/types/service';

export const getUserPostList = async (
  userId: string,
  cursorId: number,
  limit: number,
): Promise<TCursorData<TFeedPreview>> => {
  const { status, message, data } = await profile.getUserPostList(userId, cursorId, limit);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};

export const getUserPatternList = async (
  userId: string,
  cursorId: number,
  limit: number,
): Promise<TCursorData<TFeedPreview>> => {
  const { status, message, data } = await profile.getUserPatternList(userId, cursorId, limit);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};
