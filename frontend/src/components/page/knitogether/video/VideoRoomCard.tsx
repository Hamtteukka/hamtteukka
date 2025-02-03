import Image from 'next/image';
import Avatar from '@/components/ui/Avatar';
import People from '/public/svg/peopleIcon.svg';
import { useRouter } from 'next/navigation';

interface PVideoRoomCard {
  videoRoomPreview: TVideoRoom;
}

const VideoRoomCard: React.FC<PVideoRoomCard> = ({
  videoRoomPreview: { sessionId, title, hostNickname, hostProfileImg, videoImg, presentPeople, capacity },
}) => {
  const router = useRouter();
  const handleVideoRoomCardClick = () => {
    router.push(`/knitogether/room/${sessionId}`);
  };

  return (
    <div className='cursor-pointer text-detail' onClick={handleVideoRoomCardClick}>
      <div className='relative w-full pb-[75%]'>
        <Image src={videoImg} fill alt='비디오 이미지' className='rounded-md object-cover' />
      </div>
      <div className='flex flex-col gap-2 p-3'>
        <span className='font-bold'>{title}</span>
        <div className='flex justify-between'>
          <div className='flex items-center gap-2'>
            <Avatar src={hostProfileImg} />
            <span>{hostNickname}</span>
          </div>
          <div className='flex gap-2'>
            <People />
            <span>
              {presentPeople} / {capacity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoRoomCard;
