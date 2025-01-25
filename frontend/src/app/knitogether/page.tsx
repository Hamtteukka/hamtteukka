import { ModalProvider } from '@/components/context/ModalContext';
import CreateRoomButton from '@/components/knitogether/CreateRoomButton';
import VideoRoomList from '@/components/video/VideoRoomList';

const Knitogether: React.FC = () => {
  return (
    <div className='flex flex-col gap-8 px-10'>
      <header className='flex items-center justify-between text-heading1 font-bold'>
        <span>모각뜨</span>
        <ModalProvider>
          <CreateRoomButton />
        </ModalProvider>
      </header>
      <VideoRoomList />
    </div>
  );
};

export default Knitogether;
