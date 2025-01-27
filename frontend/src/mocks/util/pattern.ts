import { base64img } from '@/mocks/data/pattern';
import { TDotPattern } from '@/types/pattern';
import { TResponseData } from '@/types/service';
import { HttpResponse, StrictResponse, delay } from 'msw';

export const generateDotPattern = async (): Promise<StrictResponse<TResponseData<TDotPattern>>> => {
  await delay(5000);

  return HttpResponse.json({
    status: 'success',
    message: '서술형 도안 생성',
    data: { dotPattern: base64img },
  });
};
