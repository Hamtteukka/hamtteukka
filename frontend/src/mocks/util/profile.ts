import { POST_LIMIT } from '@/lib/constants/service';
import { MPostList } from '@/mocks/data/home';
import { MEditUser, MSubscriptionInfo } from '@/mocks/data/user';
import { TMockRequest } from '@/types/msw';
import { TFeedPreview } from '@/types/post';
import { TCursorData, TResponseData } from '@/types/service';
import { isNaturalNumber } from '@/util/number';
import { HttpResponse, StrictResponse } from 'msw';

export const getMUserInfo = async () => {
  return HttpResponse.json({
    status: 'success',
    message: '유저 정보를 성공적으로 불러왔습니다.',
    data: MSubscriptionInfo,
  });
};

export const editUserInfo = async () => {
  return HttpResponse.json({
    status: 'success',
    message: '유저 정보를 성공적으로 수정하였습니다.',
    data: MEditUser,
  });

  // return HttpResponse.json({
  //   status: 'fail',
  //   message: '이미 존재하는 닉네임입니다.',
  // });
};

export const subscribe = async () => {
  return HttpResponse.json({
    status: 'success',
    message: '성공적으로 구독하였습니다.',
    data: { subscriberCount: 11, isSubscribed: true },
  });
};

export const unsubscribe = async () => {
  return HttpResponse.json({
    status: 'success',
    message: '성공적으로 구독 취소하였습니다.',
    data: { subscriberCount: 10, isSubscribed: false },
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
