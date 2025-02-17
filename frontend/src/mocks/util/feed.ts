import { MFeedInfo } from '@/mocks/data/feed';
import { TFeedInfo, TScrap } from '@/types/post';
import { TResponseData } from '@/types/service';
import { HttpResponse, StrictResponse } from 'msw';

export const getMFeedInfo = async (): Promise<StrictResponse<TResponseData<TFeedInfo>>> => {
  return HttpResponse.json({
    status: 'success',
    message: '게시물 정보를 성공적으로 불러왔습니다.',
    data: MFeedInfo,
  });
};

export const scrapFeed = async (): Promise<StrictResponse<TResponseData<TScrap>>> => {
  return HttpResponse.json({
    status: 'success',
    message: '성공적으로 스크랩(혹은 취소) 하였습니다.',
    data: { isScrap: true },
    // data: { isScrap: false },
  });
};
