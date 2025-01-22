import VideoRoomCard from '@/components/ui/VideoRoomCard';
import { MVideoRoomList } from '@/mocks/data/video';

const Knitogether = () => {
  return (
    <div className='flex flex-wrap gap-6 p-6'>
      {MVideoRoomList.map((room, index) => (
        <VideoRoomCard key={index} videoRoomPreview={room} />
      ))}
    </div>
  );
};

export default Knitogether;
