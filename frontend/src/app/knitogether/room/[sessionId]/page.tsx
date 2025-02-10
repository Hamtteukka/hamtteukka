'use client';

import CameraToggleButton from '@/components/page/knitogether/CameraToggleButton';
import LeaveRoomButton from '@/components/page/knitogether/LeaveRoomButton';
import MikeToggleButton from '@/components/page/knitogether/MikeToggleButton';
import UserVideoCard from '@/components/page/knitogether/video/UserVideoCard';
import useOpenVidu from '@/hooks/useOpenVidu';
import { MVideoUser } from '@/mocks/data/user';
import { createOpenViduConnection } from '@/service/openvidu';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const KnitogetherRoom: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { myStream, subscribers, initOpenVidu, cleanUpOpenVidu } = useOpenVidu();
  const [videoRoom, setVideoRoom] = useState<TVideoRoom>();

  useEffect(() => {
    const startOpenVidu = async () => {
      const videoRoom = await createOpenViduConnection(sessionId);
      await initOpenVidu(videoRoom.token);
      setVideoRoom(videoRoom);
    };

    startOpenVidu();

    return () => {
      cleanUpOpenVidu();
    };
  }, []);

  return (
    <div className='flex flex-col gap-8 px-10 py-10'>
      <header className='flex items-center justify-between text-heading1 font-bold'>
        {videoRoom && <span className='truncate'>{videoRoom.title}</span>}
        <LeaveRoomButton />
      </header>
      {myStream && <UserVideoCard user={MVideoUser} stream={myStream} />}
      {subscribers.map((subscriber) => (
        <UserVideoCard user={MVideoUser} stream={subscriber} />
      ))}
      <div className='flex justify-center gap-3'>
        <CameraToggleButton />
        <MikeToggleButton />
      </div>
    </div>
  );
};

export default KnitogetherRoom;
