import Image from 'next/image';
import defaultImg from '/public/logo/logo.png';

interface PAvatar {
  src: string;
  width?: number;
  height?: number;
}

const Avatar: React.FC<PAvatar> = ({ src, width = 24, height = 24 }) => {
  return (
    <Image
      className='h-6 w-6 rounded-full object-cover'
      width={width}
      height={height}
      src={src === '' ? defaultImg : src}
      alt='프로필 이미지'
    />
  );
};

export default Avatar;
