'use client';

import { useVideoRef } from '@/hooks/useVideoRef';
import { useEffect } from 'react';
import { getDeviceId, setupCamera } from '@/util/mediaUtils';

const UserVideo: React.FC = () => {
  const { videoRef, setStream } = useVideoRef();

  const initializeCamera = async () => {
    const videoDeviceId = await getDeviceId();
    if (videoDeviceId) {
      const stream = await setupCamera(videoDeviceId);
      if (stream) {
        setStream(stream);
      }
    }
  };

  useEffect(() => {
    initializeCamera();
  }, []);

  return <video ref={videoRef} autoPlay muted playsInline className='w-full rounded-sm' />;
};

export default UserVideo;
