'use client';

import VideoRoomCard from '@/components/page/knitogether/video/VideoRoomCard';
import NoDataIndicator from '@/components/ui/NoDataIndicator';
import { getVideoRoomList } from '@/service/openvidu';
import { useEffect, useState } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

const VideoRoomList: React.FC = () => {
  const [videoRoomList, setVideoRoomList] = useState<TVideoRoom[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchVideoRoomList = async () => {
      setIsLoading(true);
      const videoRoomList = await getVideoRoomList();
      setVideoRoomList(videoRoomList);
      setIsLoading(false);
    };

    fetchVideoRoomList();
  }, []);

  return (
    <>
      {isLoading ? (
        <SyncLoader color='var(--primary)' size={8} className='m-auto' />
      ) : (
        <>
          {videoRoomList.length !== 0 ? (
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {videoRoomList.map((room) => (
                <VideoRoomCard key={room.sessionId} videoRoomPreview={room} />
              ))}
            </div>
          ) : (
            <NoDataIndicator />
          )}
        </>
      )}
    </>
  );
};

export default VideoRoomList;
