'use client';

import { Publisher, StreamManager } from 'openvidu-browser';
import { useEffect, useRef } from 'react';

interface PUserVideo {
  stream: Publisher | StreamManager;
}

const UserVideo: React.FC<PUserVideo> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      stream.addVideoElement(videoRef.current);
      console.error(stream.stream.connection.data);
    }
  }, []);

  return <video id={stream.id} ref={videoRef} autoPlay muted playsInline className='w-full rounded-sm' />;
};

export default UserVideo;
