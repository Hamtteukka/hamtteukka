import Avatar from '@/components/ui/Avatar';
import Link from 'next/link';

interface PPostPreview {
  info: TFeedPreview;
}

const PostPreview: React.FC<PPostPreview> = ({ info: { feedId, thumbnail, title, userProfile } }) => {
  return (
    <Link href={`/post/${feedId}`} className='flex grow flex-col'>
      <img className='min-h-24 w-full rounded-sm object-cover' src={thumbnail} alt='썸네일' />
      <div className='flex items-center justify-between p-2'>
        <span className='text-detail'>{title}</span>
        <Avatar src={userProfile} />
      </div>
    </Link>
  );
};

export default PostPreview;
