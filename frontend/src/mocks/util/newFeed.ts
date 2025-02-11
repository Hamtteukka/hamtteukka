import { TResponseData } from '@/types/service';
import { MFeedId } from '@/mocks/data/feed';
import { delay, HttpResponse, StrictResponse } from 'msw';

export const createFeed = async (): Promise<StrictResponse<TResponseData<TFeedId>>> => {
  await delay(1000);

  return HttpResponse.json({
    status: 'success',
    message: '게시물을 성공적으로 등록하였습니다.',
    data: MFeedId,
  });
};
