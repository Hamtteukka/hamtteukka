import { SUCCESS } from '@/lib/constants/service';
import { profile } from '@/service/api';
import { TCursorData } from '@/types/service';
import { TSubscription, TSubscriptionCancel, TSubscriptionInfo } from '@/types/user';

export const getUserInfo = async (userId: string): Promise<TSubscriptionInfo> => {
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

export const subscribe = async (nickname: string): Promise<TSubscription> => {
  const { status, message, data } = await profile.subscribe(nickname);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};

export const unsubscribe = async (nickname: string): Promise<TSubscriptionCancel> => {
  const { status, message, data } = await profile.unsubscribe(nickname);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};
