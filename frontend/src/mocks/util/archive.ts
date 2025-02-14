import { POST_LIMIT } from '@/lib/constants/service';
import { MStoredPostList, MSubscriptionList } from '@/mocks/data/archive';
import { TSubscriptionProfile } from '@/types/archive';
import { TMockRequest } from '@/types/msw';
import { TFeedPreview } from '@/types/post';
import { TCursorData, TResponseData } from '@/types/service';
import { isNaturalNumber } from '@/util/number';
import { delay, HttpResponse, StrictResponse } from 'msw';

export const getMSubscriptionList = async (): Promise<StrictResponse<TResponseData<TSubscriptionProfile[]>>> => {
  await delay(1000);

  return HttpResponse.json({
    status: 'success',
    message: '구독 목록을 성공적으로 가져왔습니다.',
    data: MSubscriptionList,
  });
};

export const getMStoredPostList = async ({
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
    message: 'User saved feeds retrieved successfully',
    data: {
      items,
      hasNextItems,
      nextCursorId,
    },
  });
};
