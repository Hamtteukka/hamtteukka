'use client';

import { useEffect, useRef, useState } from 'react';
import { getDeviceId, setupCamera } from '@/util/mediaUtils';
import useOpenVidu from '@/hooks/useOpenVidu';

const UserVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { myStream, initOpenVidu } = useOpenVidu();

  useEffect(() => {
    initOpenVidu();
  }, []);

  return <video ref={videoRef} id={myStream?.id} autoPlay muted playsInline className='w-full rounded-sm' />;
};

export default UserVideo;
