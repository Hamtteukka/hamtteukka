import { POST_LIMIT } from '@/lib/constants/service';
import { MPostList } from '@/mocks/data/home';
import { TMockRequest } from '@/types/msw';
import { TCursorData, TResponseData } from '@/types/service';
import { isNaturalNumber } from '@/util/number';
import { delay, HttpResponse, StrictResponse } from 'msw';

export const getMPostList = async ({
  request,
}: TMockRequest): Promise<StrictResponse<TResponseData<TCursorData<TFeedPreview>>>> => {
  const url = new URL(request.url);
  const cursorId = Number(url.searchParams.get('cursorId') ?? 0);
  const limit = Number(url.searchParams.get('limit') ?? POST_LIMIT);

  const startIndex = isNaturalNumber(cursorId, true) ? cursorId : 0;
  const endIndex = startIndex + limit;

  const items = MPostList.slice(startIndex, endIndex);

  const hasNextItems = endIndex < MPostList.length;
  const nextCursorId = hasNextItems ? endIndex : -1;

  await delay(1000);

  return HttpResponse.json({
    status: 'success',
    message: 'Home feeds retrieved successfully',
    data: {
      items,
      hasNextItems,
      nextCursorId,
    },
  });
};
