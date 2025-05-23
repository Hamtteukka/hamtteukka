import { SUCCESS } from '@/lib/constants/service';
import { openvidu } from '@/service/api';

export const createOpenViduSession = async (formData: FormData): Promise<TSessionId> => {
  const { status, message, data } = await openvidu.createSession(formData);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};

export const createOpenViduConnection = async (sessionId: string): Promise<TVideoRoom> => {
  const { status, message, data } = await openvidu.createToken(sessionId);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};

export const getVideoRoomList = async (): Promise<TVideoRoom[]> => {
  const { status, message, data } = await openvidu.getVideoRoomList();
  if (status !== SUCCESS) throw new Error(message);

  return data;
};

export const leaveVideoRoom = async (sessionId: string) => {
  const { status, message } = await openvidu.leaveVideoRoom(sessionId);
  if (status !== SUCCESS) throw new Error(message);
};
