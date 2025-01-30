/**
 * OpenVidu client service
 * 오픈비두 미디어 서버와 실시간 통신을 위한 기능
 */

import { OpenVidu, Publisher, PublisherProperties, Session, SessionEventMap } from 'openvidu-browser';
import { createOpenViduConnection, createOpenViduSession } from '@/service/openvidu';
import { SessionEventHandler } from '@/types/openvidu';
import { TUser } from '@/types/user';

interface PSessionInfo {
  userInfo: TUser;
  roomInfo: FormData;
  ov: OpenVidu;
  session: Session;
  eventHandlers: SessionEventHandler<keyof SessionEventMap>[];
  publisherProperties: PublisherProperties;
  sessionId?: string;
}

/**
 * 모각뜨 방 생성 혹은 참가
 * @param PSessionInfo
 * @returns Promise<Publisher>
 */
export const joinVideoRoom = async ({
  userInfo,
  roomInfo,
  ov,
  session,
  eventHandlers,
  publisherProperties,
  sessionId,
}: PSessionInfo): Promise<Publisher> => {
  if (!sessionId) {
    sessionId = await createOpenViduSession(roomInfo);
  }

  const token = await createOpenViduConnection(sessionId);
  await addSessionEventListeners(session, eventHandlers);
  await connectToSession(session, token, userInfo);
  const publisher = await initPublisher(ov, session, publisherProperties);
  return publisher;
};

/**
 * 세션에 이벤트 핸들러 등록
 * @param session
 * @param eventHandlers
 */
const addSessionEventListeners = async (
  session: Session,
  eventHandlers: SessionEventHandler<keyof SessionEventMap>[],
) => {
  eventHandlers.forEach((eventHandler) => {
    session.on(eventHandler.type, eventHandler.handler);
  });
};

/**
 * 발급받은 토큰을 통해 세션에 연결
 * @param session
 * @param token
 * @param userInfo
 */
const connectToSession = async (session: Session, token: string, userInfo: TUser) => {
  await session.connect(token, userInfo);
};

/**
 * 자신의 미디어를 송출하는 Publisher 생성
 * @param ov
 * @param session
 * @param publisherProperties
 * @returns Promise<Publisher>
 */
const initPublisher = async (
  ov: OpenVidu,
  session: Session,
  publisherProperties: PublisherProperties,
): Promise<Publisher> => {
  const newPublisher = await ov.initPublisherAsync(undefined, publisherProperties);
  session.publish(newPublisher);
  return newPublisher;
};
