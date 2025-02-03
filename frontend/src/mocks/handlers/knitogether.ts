import { MSessionId } from '@/mocks/data/video';
import { MockRestClient } from '@/mocks/mockRestClient';
import { createOpenViduSession, createOpenViduConnection } from '@/mocks/util/knitogether';

export const handlers = [
  MockRestClient.post('/api/openvidu/sessions', createOpenViduSession),
  MockRestClient.get(`/api/openvidu/sessions/${MSessionId.sessionId}/connections`, createOpenViduConnection),
];
