import { MFeedInfo } from '@/mocks/data/feed';
import { TFeedInfo } from '@/types/post';
import { TResponseData } from '@/types/service';
import { HttpResponse, StrictResponse } from 'msw';

export const getMFeedInfo = async (): Promise<StrictResponse<TResponseData<TFeedInfo>>> => {
  return HttpResponse.json({
    status: 'success',
    message: '게시물 정보를 성공적으로 불러왔습니다.',
    data: MFeedInfo,
  });
};
