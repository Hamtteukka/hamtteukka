import Avatar from '@/components/ui/Avatar';
import Image from 'next/image';
import Link from 'next/link';

interface PPostPreview {
  info: TPostPreview;
}

const PostPreview: React.FC<PPostPreview> = ({ info: { feedId, thumbnail, title, userProfile } }) => {
  return (
    <Link href={`/post/${feedId}`} className='m-auto flex flex-col'>
      <Image
        className='max-h-[28rem] min-h-64 w-80 rounded-sm border border-primary-dark object-cover'
        src={thumbnail}
        alt='썸네일'
        width={300}
        height={300}
      />
      <div className='flex items-center justify-between p-2'>
        <span className='text-detail'>{title}</span>
        <Avatar src={userProfile} />
      </div>
    </Link>
  );
};

export default PostPreview;
