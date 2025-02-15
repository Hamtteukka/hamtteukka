import { TFeedInfo } from '@/types/post';

interface PFeedImageForm {
  feedInfo: TFeedInfo;
}

const FeedImageForm: React.FC<PFeedImageForm> = ({ feedInfo: { images } }) => {
  return (
    <div className='flex w-2/5 flex-col items-center overflow-y-auto'>
      {images.map((image) => (
        <img src={image} />
      ))}
    </div>
  );
};

export default FeedImageForm;
