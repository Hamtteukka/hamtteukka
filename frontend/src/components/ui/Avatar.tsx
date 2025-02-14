import Image from 'next/image';
import defaultImg from '/public/logo/logo.png';

interface PAvatar {
  src: string;
  size?: 'sm' | 'lg';
}

const Avatar: React.FC<PAvatar> = ({ src, size = 'sm' }) => {
  const width = size === 'sm' ? 6 : 36;

  return (
    <div className={`relative h-${width} w-${width} overflow-hidden rounded-full`}>
      <img className='h-full w-full object-cover' src={src === '' ? defaultImg.src : src} alt='프로필 이미지' />
    </div>
  );
};

export default Avatar;
