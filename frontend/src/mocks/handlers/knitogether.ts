import { MSessionId } from '@/mocks/data/video';
import { MockRestClient } from '@/mocks/mockRestClient';
import {
  createOpenViduSession,
  createOpenViduConnection,
  getVideoRoomList,
  leaveVideoRoom,
} from '@/mocks/util/knitogether';

export const handlers = [
  MockRestClient.get('/api/openvidu/sessions', getVideoRoomList),
  MockRestClient.post('/api/openvidu/sessions', createOpenViduSession),
  MockRestClient.get(`/api/openvidu/sessions/${MSessionId.sessionId}/connections`, createOpenViduConnection),
  MockRestClient.delete(`/api/openvidu/sessions/${MSessionId.sessionId}`, leaveVideoRoom),
];
