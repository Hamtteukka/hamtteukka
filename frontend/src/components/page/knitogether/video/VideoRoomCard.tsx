import Image from 'next/image';
import Avatar from '@/components/ui/Avatar';
import People from '/public/svg/peopleIcon.svg';

interface PVideoRoomCard {
  videoRoomPreview: TVideoRoomPreview;
}

const VideoRoomCard: React.FC<PVideoRoomCard> = ({
  videoRoomPreview: { title, hostName, hostImg, videoImg, currentUsers, maxUsers },
}) => {
  return (
    <div className='cursor-pointer text-detail'>
      <div className='relative w-full pb-[75%]'>
        <Image src={videoImg} fill alt='비디오 이미지' className='rounded-md object-cover' />
      </div>
      <div className='flex flex-col gap-2 p-3'>
        <span className='font-bold'>{title}</span>
        <div className='flex justify-between'>
          <div className='flex items-center gap-2'>
            <Avatar src={hostImg} />
            <span>{hostName}</span>
          </div>
          <div className='flex gap-2'>
            <People />
            <span>
              {currentUsers} / {maxUsers}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoRoomCard;
