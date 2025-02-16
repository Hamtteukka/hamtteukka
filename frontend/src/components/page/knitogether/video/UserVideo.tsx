'use client';

import { Publisher, StreamManager } from 'openvidu-browser';
import { useEffect, useRef } from 'react';
import VideoOffIcon from '/public/svg/videoOffIcon.svg';

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

  useEffect(() => {
    if (stream) console.log('스트림 존재');
    else console.log('스트림 없음');

    console.log('카메라 상태: ' + isOn);
  }, [stream, isOn]);

  return (
    <div className='relative aspect-video h-full w-full overflow-hidden rounded-sm bg-deepgray'>
      {/* {isOn ? (
        <video id={stream?.id} ref={videoRef} autoPlay playsInline className='h-full w-full object-cover' />
      ) : (
        <VideoOffIcon className='absolute left-[calc(50%-12px)] top-[calc(50%-12px)]' />
      )} */}
      <video id={stream?.id} ref={videoRef} autoPlay playsInline className='h-full w-full object-cover' />
    </div>
  );
};

export default UserVideo;
