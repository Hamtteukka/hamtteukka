'use client';

import { Publisher, StreamManager } from 'openvidu-browser';
import { useEffect, useRef } from 'react';
import VideoOffIcon from '/public/svg/VideoOffIcon.svg';

interface PUserVideo {
  stream: Publisher | StreamManager | undefined;
  isOn?: boolean;
}

const UserVideo: React.FC<PUserVideo> = ({ stream, isOn }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      stream.addVideoElement(videoRef.current);
      console.error(stream.stream.connection.data);
    }
  }, [stream]);

  return (
    <div className='bg-deepgray relative aspect-video h-full w-full overflow-hidden rounded-sm'>
      {stream && isOn ? (
        <video id={stream.id} ref={videoRef} autoPlay playsInline className='h-full w-full object-cover' />
      ) : (
        <VideoOffIcon className='absolute left-[calc(50%-12px)] top-[calc(50%-12px)]' />
      )}
    </div>
  );
};

export default UserVideo;
