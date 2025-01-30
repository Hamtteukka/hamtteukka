import { SUCCESS } from '@/lib/constants/service';
import { openvidu } from '@/service/api';

export const createOpenViduSession = async (formData: FormData): Promise<string> => {
  const { status, message, data } = await openvidu.createSession(formData);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};

export const createOpenViduConnection = async (sessionId: string): Promise<string> => {
  const { status, message, data } = await openvidu.createToken(sessionId);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};
