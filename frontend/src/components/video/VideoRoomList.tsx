'use client';

import VideoRoomCard from '@/components/video/VideoRoomCard';
import { MVideoRoomList } from '@/mocks/data/video';

const VideoRoomList = () => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {MVideoRoomList.map((room) => (
        <VideoRoomCard key={room.id} videoRoomPreview={room} />
      ))}
    </div>
  );
};

export default VideoRoomList;
