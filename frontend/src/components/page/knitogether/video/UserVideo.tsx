'use client';

import { Publisher } from 'openvidu-browser';

interface PUserVideo {
  stream: Publisher;
}

const UserVideo: React.FC<PUserVideo> = ({ stream }) => {
  return <video id={stream.id} autoPlay muted playsInline className='w-full rounded-sm' />;
};

export default UserVideo;
