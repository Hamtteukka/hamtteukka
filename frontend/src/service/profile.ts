import { SUCCESS } from '@/lib/constants/service';
import { profile } from '@/service/api';
import { TFeedPreview } from '@/types/post';
import { TCursorData } from '@/types/service';
import { TSubscription, TSubscriptionUser } from '@/types/user';

export const getUserInfo = async (userId: string): Promise<TSubscriptionUser> => {
  const { status, message, data } = await profile.getUserInfo(userId);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};

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

export const subscribe = async (userId: number): Promise<TSubscription> => {
  const { status, message, data } = await profile.subscribe(userId);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};

export const unsubscribe = async (userId: number): Promise<TSubscription> => {
  const { status, message, data } = await profile.unsubscribe(userId);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};
