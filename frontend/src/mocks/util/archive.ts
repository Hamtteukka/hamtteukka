import { POST_LIMIT } from '@/lib/constants/service';
import { MStoredPostList } from '@/mocks/data/archive';
import { TMockRequest } from '@/types/msw';
import { TCursorData, TResponseData } from '@/types/service';
import { isNaturalNumber } from '@/util/number';
import { HttpResponse, StrictResponse } from 'msw';

export const getMStoredPostList = async ({
  request,
}: TMockRequest): Promise<StrictResponse<TResponseData<TCursorData<TPostPreview>>>> => {
  const url = new URL(request.url);
  const cursorId = Number(url.searchParams.get('cursorId') ?? 0);
  const limit = Number(url.searchParams.get('limit') ?? POST_LIMIT);

  const startIndex = isNaturalNumber(cursorId, true) ? cursorId : 0;
  const endIndex = startIndex + limit;

  const items = MStoredPostList.slice(startIndex, endIndex);

  const hasNextItems = endIndex < MStoredPostList.length;
  const nextCursorId = hasNextItems ? endIndex : -1;

  return HttpResponse.json({
    status: 'success',
    message: 'User saved feeds retrieved successfully',
    data: {
      items,
      hasNextItems,
      nextCursorId,
    },
  });
};
