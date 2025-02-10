import NewFeedContentForm from '@/components/page/feed/new/NewFeedContentForm';
import NewFeedImageForm from '@/components/page/feed/new/NewFeedImageForm';

const NewFeed: React.FC = () => {
  return (
    <div className='flex h-screen'>
      <NewFeedImageForm />
      <NewFeedContentForm />
    </div>
  );
};

export default NewFeed;
