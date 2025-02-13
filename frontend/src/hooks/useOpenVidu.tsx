import { useState } from 'react';
import { OpenVidu, Publisher, Session, StreamManager } from 'openvidu-browser';
import { joinVideoRoom } from '@/service/openvidu/client';
import { useUserStore } from '@/store/loginUser';
import { SessionEventHandler } from '@/types/openvidu';
import { publisherProperties } from '@/lib/openvidu';

const useOpenVidu = () => {
  const [ov, setOv] = useState<OpenVidu>();
  const [session, setSession] = useState<Session>();
  const [myStream, setMyStream] = useState<Publisher>();
  const [subscribers, setSubscribers] = useState<StreamManager[]>([]);

  const [cameraOn, setCameraOn] = useState<boolean>(true);
  const [micOn, setMicOn] = useState<boolean>(true);

  const userInfo = useUserStore();

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

    /**
     * 예외가 발생했을 때 동작하는 이벤트 핸들러
     */
    const handleException: SessionEventHandler<'exception'> = {
      type: 'exception',
      handler: (exception) => {
        console.warn(exception);
      },
    };

    const eventHandlers: SessionEventHandler<any>[] = [handleStreamCreated, handleConnectionDestroyed, handleException];
    return eventHandlers;
  };

  const toggleCamera = () => {
    if (myStream) {
      const videoEnabled = myStream.stream.videoActive;
      myStream.publishVideo(!videoEnabled);
      setCameraOn((prev) => !prev);
    }
  };

  const toggleMic = () => {
    if (myStream) {
      const audioEnabled = myStream.stream.audioActive;
      myStream.publishAudio(!audioEnabled);
      setMicOn((prev) => !prev);
    }
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
    if (session) {
      session.disconnect();
    }

    setOv(undefined);
    setSession(undefined);
    setMyStream(undefined);
    setSubscribers([]);
  };

  return { myStream, subscribers, cameraOn, micOn, initOpenVidu, cleanUpOpenVidu, toggleCamera, toggleMic };
};

export default useOpenVidu;
