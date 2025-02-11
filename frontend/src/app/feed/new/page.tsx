import { NewFeedProvider } from '@/components/context/NewFeedContext';
import NewFeedContentForm from '@/components/page/feed/new/NewFeedContentForm';
import NewFeedImageForm from '@/components/page/feed/new/NewFeedImageForm';

const NewFeed: React.FC = () => {
  return (
    <div className='flex h-screen'>
      <NewFeedProvider>
        <NewFeedImageForm />
        <NewFeedContentForm />
      </NewFeedProvider>
    </div>
  );
};

export default NewFeed;
