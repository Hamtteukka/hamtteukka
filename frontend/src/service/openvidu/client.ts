/**
 * OpenVidu client service
 * 오픈비두 미디어 서버와 실시간 통신을 위한 기능
 */

import { OpenVidu, Publisher, PublisherProperties, Session, SessionEventMap } from 'openvidu-browser';
import { SessionEventHandler } from '@/types/openvidu';
import { TUser } from '@/types/user';

interface PSessionInfo {
  token: string;
  userInfo: TUser;
  ov: OpenVidu;
  session: Session;
  eventHandlers: SessionEventHandler<keyof SessionEventMap>[];
  publisherProperties: PublisherProperties;
}

/**
 * 토큰을 통해 모각뜨 방 참가
 * @param joinSessionInfo
 * @returns Promise<Publisher>
 */
export const joinVideoRoom = async ({
  token,
  userInfo,
  ov,
  session,
  eventHandlers,
  publisherProperties,
}: PSessionInfo): Promise<any> => {
  try {
    await addSessionEventListeners(session, eventHandlers);
    await connectToSession(session, token, userInfo);
    const publisher = await initPublisher(ov, session, publisherProperties);
    return publisher;
  } catch (e) {
    console.error('실시간 연결 에러: ' + e);
  }
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
  console.error('connectToSession 함수입니다!!');
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
