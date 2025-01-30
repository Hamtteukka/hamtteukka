'use client';

import VideoRoomCard from '@/components/page/knitogether/video/VideoRoomCard';
import { MVideoRoomList } from '@/mocks/data/video';

const VideoRoomList: React.FC = () => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {MVideoRoomList.map((room) => (
        <VideoRoomCard key={room.sessionId} videoRoomPreview={room} />
      ))}
    </div>
  );
};

export default VideoRoomList;
