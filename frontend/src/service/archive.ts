import { SUCCESS } from '@/lib/constants/service';
import { archive } from '@/service/api';
import { TCursorData } from '@/types/service';

export const getStoredPostList = async (cursorId: number, limit: number): Promise<TCursorData<TPostPreview>> => {
  const { status, message, data } = await archive.getStoredPostList(cursorId, limit);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};

export const getStoredPatternList = async (cursorId: number, limit: number): Promise<TCursorData<TPostPreview>> => {
  const { status, message, data } = await archive.getStoredPatternList(cursorId, limit);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};
