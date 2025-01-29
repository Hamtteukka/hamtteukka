import CameraToggleButton from '@/components/page/knitogether/CameraToggleButton';
import LeaveRoomButton from '@/components/page/knitogether/LeaveRoomButton';
import MikeToggleButton from '@/components/page/knitogether/MikeToggleButton';
import UserVideoCard from '@/components/page/knitogether/video/UserVideoCard';
import { MVideoUser } from '@/mocks/data/user';

const KnitogetherRoom: React.FC = () => {
  return (
    <div className='flex flex-col gap-8 px-10'>
      <header className='flex items-center justify-between text-heading1 font-bold'>
        <span className='truncate'>같이 조용히 뜨개질 해요 ㅎㅎ</span>
        <LeaveRoomButton />
      </header>
      <UserVideoCard user={MVideoUser} />
      <div className='flex justify-center gap-3'>
        <CameraToggleButton />
        <MikeToggleButton />
      </div>
    </div>
  );
};

export default KnitogetherRoom;
