import Image from 'next/image';
import defaultImg from '/public/logo/logo.png';

interface PAvatar {
  src: string;
  size?: 'sm' | 'lg';
}

const Avatar: React.FC<PAvatar> = ({ src, size = 'sm' }) => {
  const width = size === 'sm' ? 6 : 36;

  return (
    <img
      className={`h-${width} w-${width} rounded-full object-cover`}
      src={src === '' ? defaultImg.src : src}
      alt='프로필 이미지'
    />
  );
};

export default Avatar;
