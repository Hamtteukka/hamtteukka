'use client';

import CameraToggleButton from '@/components/page/knitogether/CameraToggleButton';
import LeaveRoomButton from '@/components/page/knitogether/LeaveRoomButton';
import MikeToggleButton from '@/components/page/knitogether/MikeToggleButton';
import UserVideoCard from '@/components/page/knitogether/video/UserVideoCard';
import useOpenVidu from '@/hooks/useOpenVidu';
import { createOpenViduConnection, leaveVideoRoom } from '@/service/openvidu';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const KnitogetherRoom: React.FC = () => {
  const router = useRouter();
  const { sessionId } = useParams<{ sessionId: string }>();
  const { myStream, subscribers, cameraOn, micOn, initOpenVidu, cleanUpOpenVidu, toggleCamera, toggleMic } =
    useOpenVidu();
  const [videoRoom, setVideoRoom] = useState<TVideoRoom>();

  const getGridColumns = () => {
    const totalCards = subscribers.length + 1;
    if (totalCards >= 7) return 'grid grid-cols-4';
    if (totalCards >= 5) return 'grid grid-cols-3';
    if (totalCards >= 2) return 'grid grid-cols-2';
    return 'flex';
  };

  useEffect(() => {
    const startOpenVidu = async () => {
      try {
        const videoRoom = await createOpenViduConnection(sessionId);
        await initOpenVidu(videoRoom.token);
        setVideoRoom(videoRoom);
      } catch (e) {
        alert(e);
        router.push('/knitogether');
      }
    };

    const endOpenVidu = async () => {
      try {
        cleanUpOpenVidu();
        await leaveVideoRoom(sessionId);
        router.push('/knitogether');
      } catch (e) {
        alert(e);
      }
    };

    startOpenVidu();

    window.addEventListener('beforeunload', endOpenVidu);

    return () => {
      window.removeEventListener('beforeunload', endOpenVidu);
    };
  }, [sessionId]);

  return (
    <div className='flex h-screen w-full flex-col gap-8 px-10 py-10'>
      <header className='flex items-center justify-between text-heading1 font-bold'>
        {videoRoom && <span className='truncate'>{videoRoom.title}</span>}
        <LeaveRoomButton onLeave={cleanUpOpenVidu} />
      </header>
      <div className={`${getGridColumns()} w-full grow grid-cols-2 justify-center gap-2.5 overflow-y-hidden`}>
        <UserVideoCard host={videoRoom?.hostNickname} stream={myStream} isOn={myStream?.stream.videoActive} />

        {subscribers.map((subscriber) => (
          <UserVideoCard host={videoRoom?.hostNickname} stream={subscriber} isOn={subscriber.stream.videoActive} />
        ))}
      </div>
      <div className='flex justify-center gap-3'>
        <CameraToggleButton isOn={cameraOn} onClick={toggleCamera} />
        <MikeToggleButton isOn={micOn} onClick={toggleMic} />
      </div>
    </div>
  );
};

export default KnitogetherRoom;
