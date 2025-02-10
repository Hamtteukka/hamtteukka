import { ModalProvider } from '@/components/context/ModalContext';
import CreateRoomButton from '@/components/page/knitogether/CreateRoomButton';
import VideoRoomList from '@/components/page/knitogether/video/VideoRoomList';
import { H1 } from '@/components/typography/Heading';

const Knitogether: React.FC = () => {
  return (
    <div className='flex flex-col gap-8 p-10'>
      <header className='flex items-center justify-between'>
        <H1>모각뜨</H1>
        <ModalProvider>
          <CreateRoomButton />
        </ModalProvider>
      </header>
      <VideoRoomList />
    </div>
  );
};

export default Knitogether;
