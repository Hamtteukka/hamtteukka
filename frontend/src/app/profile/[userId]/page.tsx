import ProfileContainer from '@/components/page/profile/ProfileContainer';
import { H1 } from '@/components/typography/Heading';

const Profile: React.FC = () => {
  return (
    <div className='h-screen'>
      <div className='flex h-full flex-col gap-8 overflow-y-auto p-10'>
        <header className='flex items-center justify-between'>
          <H1>프로필</H1>
        </header>
        <ProfileContainer />
      </div>
    </div>
  );
};

export default Profile;
