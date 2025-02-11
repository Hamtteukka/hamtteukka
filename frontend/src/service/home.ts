import { SUCCESS } from '@/lib/constants/service';
import { TCursorData } from '@/types/service';
import { home } from '@/service/api';

export const getPostList = async (cursorId: number, limit: number): Promise<TCursorData<TFeedPreview>> => {
  const { status, message, data } = await home.getPostList(cursorId, limit);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};
