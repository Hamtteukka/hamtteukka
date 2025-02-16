import { SUCCESS } from '@/lib/constants/service';
import { TCursorData } from '@/types/service';
import { search } from '@/service/api';
import { TFeedPreview } from '@/types/post';

export const getSearchedPostList = async (
  cursorId: number,
  limit: number,
  keyword: string,
  categoryIds: string,
): Promise<TCursorData<TFeedPreview>> => {
  const { status, message, data } = await search.getSearchedPostList(cursorId, limit, keyword, categoryIds);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};
