import { useState } from 'react';
import { OpenVidu, Publisher, Session, StreamManager } from 'openvidu-browser';
import { joinVideoRoom } from '@/service/openvidu/client';
import { useLoginUser } from '@/store/loginUser';
import { SessionEventHandler } from '@/types/openvidu';
import { publisherProperties } from '@/lib/openvidu';

const useOpenVidu = () => {
  const [ov, setOv] = useState<OpenVidu>();
  const [session, setSession] = useState<Session>();
  const [myStream, setMyStream] = useState<Publisher>();
  const [subscribers, setSubscribers] = useState<StreamManager[]>([]);

  const userInfo = useLoginUser();

  const getOpenViduEventHandlers = (session: Session): SessionEventHandler<any>[] => {
    /**
     * 새로운 유저가 방에 들어왔을 때 동작하는 이벤트 핸들러
     */
    const handleStreamCreated: SessionEventHandler<'streamCreated'> = {
      type: 'streamCreated',
      handler: (event) => {
        const subscriber = session.subscribe(event.stream, undefined);
        setSubscribers((prev) => [...prev, subscriber]);
      },
    };

    /**
     * 어떤 유저가 방을 퇴장했을 때 동작하는 이벤트 핸들러
     */
    const handleConnectionDestroyed: SessionEventHandler<'connectionDestroyed'> = {
      type: 'connectionDestroyed',
      handler: (event) => {
        const connectionId = event.connection.connectionId;
        setSubscribers((prev) =>
          prev.filter((subscriber) => subscriber.stream.connection.connectionId !== connectionId),
        );
      },
    };

    const eventHandlers: SessionEventHandler<any>[] = [handleStreamCreated, handleConnectionDestroyed];
    return eventHandlers;
  };

  const initOpenVidu = async (token: string) => {
    const ov = new OpenVidu();
    const session = ov.initSession();
    const eventHandlers = getOpenViduEventHandlers(session);

    const publisher = await joinVideoRoom({
      token,
      userInfo,
      ov,
      session,
      eventHandlers,
      publisherProperties,
    });

    setOv(ov);
    setSession(session);
    setMyStream(publisher);
  };

  const cleanUpOpenVidu = () => {
    setOv(undefined);
    setSession(undefined);
    setMyStream(undefined);
    setSubscribers([]);
  };

  return { myStream, subscribers, initOpenVidu, cleanUpOpenVidu };
};

export default useOpenVidu;
