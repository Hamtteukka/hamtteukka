'use client';

import Button from '@/components/ui/button/Button';
import VideoRoomCard from '@/components/video/VideoRoomCard';
import { MVideoRoomList } from '@/mocks/data/video';

const handleCreateRoom = () => {
  console.log('버튼 클릭');
};

const Knitogether = () => {
  return (
    <div className='flex flex-col gap-8 p-10'>
      <header className='flex items-center justify-between text-heading1 font-bold'>
        <span>모각뜨</span>
        <Button onClick={handleCreateRoom}>
          <span className='text-body1 font-bold'>방 생성</span>
        </Button>
      </header>
      <div className='flex flex-wrap gap-6'>
        {MVideoRoomList.map((room, index) => (
          <VideoRoomCard key={index} videoRoomPreview={room} />
        ))}
      </div>
    </div>
  );
};

export default Knitogether;
