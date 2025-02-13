import { POST_LIMIT } from '@/lib/constants/service';
import { MPostList } from '@/mocks/data/home';
import { MSubscriptionInfo } from '@/mocks/data/user';
import { TMockRequest } from '@/types/msw';
import { TCursorData, TResponseData } from '@/types/service';
import { isNaturalNumber } from '@/util/number';
import { delay, HttpResponse, StrictResponse } from 'msw';

export const getMUserInfo = async () => {
  await delay(1000);

  return HttpResponse.json({
    status: 'success',
    message: '유저 정보를 성공적으로 불러왔습니다.',
    data: MSubscriptionInfo,
  });
};

export const subscribe = async () => {
  await delay(200);

  return HttpResponse.json({
    status: 'success',
    message: '성공적으로 구독하였습니다.',
    data: { isSubscribe: true },
  });
};

export const unsubscribe = async () => {
  await delay(200);

  return HttpResponse.json({
    status: 'success',
    message: '성공적으로 구독 취소하였습니다.',
    data: { isSubscribeCancle: false },
  });
};

export const getMUserPostList = async ({
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
    message: 'User feeds retrieved successfully',
    data: {
      items,
      hasNextItems,
      nextCursorId,
    },
  });
};
