import { base64img, textPattern } from '@/mocks/data/pattern';
import { TDotPattern, TTextPattern } from '@/types/pattern';
import { TResponseData } from '@/types/service';
import { HttpResponse, StrictResponse, delay } from 'msw';

export const generateTextPattern = async (): Promise<StrictResponse<TResponseData<TTextPattern>>> => {
  await delay(5000);

  return HttpResponse.json({
    status: 'success',
    message: '서술형 도안 생성',
    data: textPattern,
  });
};

export const generateDotPattern = async (): Promise<StrictResponse<TResponseData<TDotPattern>>> => {
  await delay(5000);

  return HttpResponse.json({
    status: 'success',
    message: '도트 도안 생성',
    data: { dotPattern: base64img },
  });
};
