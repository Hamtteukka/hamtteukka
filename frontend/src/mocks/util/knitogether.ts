import { HttpResponse, StrictResponse, delay } from 'msw';
import { TResponse, TResponseData } from '@/types/service';
import { MSessionId, MVideoRoomList } from '@/mocks/data/video';

export const createOpenViduSession = async (): Promise<StrictResponse<TResponseData<TSessionId>>> => {
  await delay(1000);

  return HttpResponse.json({
    status: 'success',
    message: '고유한 세션 ID을 발급하였습니다.',
    data: MSessionId,
  });
};

export const createOpenViduConnection = async (): Promise<StrictResponse<TResponseData<TVideoRoom>>> => {
  await delay(1000);

  return HttpResponse.json({
    status: 'success',
    message: '성공적으로 방에 접속하였습니다.',
    data: MVideoRoomList[0],
  });
};

export const getVideoRoomList = async (): Promise<StrictResponse<TResponseData<TVideoRoom[]>>> => {
  await delay(1000);

  return HttpResponse.json({
    status: 'success',
    message: '비디오 방 목록을 성공적으로 가져왔습니다.',
    data: MVideoRoomList,
  });
};

export const leaveVideoRoom = async (): Promise<StrictResponse<TResponse>> => {
  await delay(1000);

  return HttpResponse.json({
    status: 'success',
    message: '성공적으로 방을 퇴장하였습니다.',
  });
};
