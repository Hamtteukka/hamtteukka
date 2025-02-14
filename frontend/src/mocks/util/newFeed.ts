import { TCursorData, TMockRequest, TResponseData } from '@/types/service';
import { MFeedId } from '@/mocks/data/feed';
import { delay, HttpResponse, StrictResponse } from 'msw';
import { POST_LIMIT } from '@/lib/constants/service';
import { isNaturalNumber } from '@/util/number';
import { MStoredPostList } from '@/mocks/data/archive';
import { TFeedId, TFeedPreview } from '@/types/post';

export const createFeed = async (): Promise<StrictResponse<TResponseData<TFeedId>>> => {
  await delay(1000);

  return HttpResponse.json({
    status: 'success',
    message: '게시물을 성공적으로 등록하였습니다.',
    data: MFeedId,
  });
};

export const createAIFeed = async (): Promise<StrictResponse<TResponseData<TFeedId>>> => {
  await delay(1000);

  return HttpResponse.json({
    status: 'success',
    message: '게시물을 성공적으로 등록하였습니다.',
    data: MFeedId,
  });
};

export const getAIPatternPostList = async ({
  request,
}: TMockRequest): Promise<StrictResponse<TResponseData<TCursorData<TFeedPreview>>>> => {
  const url = new URL(request.url);
  const cursorId = Number(url.searchParams.get('cursorId') ?? 0);
  const limit = Number(url.searchParams.get('limit') ?? POST_LIMIT);

  const startIndex = isNaturalNumber(cursorId, true) ? cursorId : 0;
  const endIndex = startIndex + limit;

  const items = MStoredPostList.slice(startIndex, endIndex);

  const hasNextItems = endIndex < MStoredPostList.length;
  const nextCursorId = hasNextItems ? endIndex : -1;

  await delay(1000);

  return HttpResponse.json({
    status: 'success',
    message: 'User AI feeds retrieved successfully',
    data: {
      items,
      hasNextItems,
      nextCursorId,
    },
  });
};
