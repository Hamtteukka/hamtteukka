'use client';

import VideoRoomCard from '@/components/page/knitogether/video/VideoRoomCard';
import { getVideoRoomList } from '@/service/openvidu';
import { useEffect, useState } from 'react';

const VideoRoomList: React.FC = () => {
  const [videoRoomList, setVideoRoomList] = useState<TVideoRoom[]>([]);

  useEffect(() => {
    const fetchVideoRoomList = async () => {
      const videoRoomList = await getVideoRoomList();
      setVideoRoomList(videoRoomList);
    };

    fetchVideoRoomList();
  }, []);

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {videoRoomList.map((room) => (
        <VideoRoomCard key={room.sessionId} videoRoomPreview={room} />
      ))}
    </div>
  );
};

export default VideoRoomList;
