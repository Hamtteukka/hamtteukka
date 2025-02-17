import Image from 'next/image';
import defaultImg from '/public/logo/logo.png';

interface PAvatar {
  src: string;
  size?: 'sm' | 'lg';
}

const Avatar: React.FC<PAvatar> = ({ src, size = 'sm' }) => {
  const sizeClass = size === 'sm' ? 'h-6 w-6' : 'h-36 w-36';

  return (
    <div className={`relative overflow-hidden rounded-full ${sizeClass}`}>
      <img className='h-full w-full object-cover' src={src === '' ? defaultImg.src : src} alt='프로필 이미지' />
    </div>
  );
};

export default Avatar;
