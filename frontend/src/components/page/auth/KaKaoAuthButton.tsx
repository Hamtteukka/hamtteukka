'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button/Button';
import Image from 'next/image';
import { KAKAO_AUTHORIZE_URL } from '@/lib/constants/service';

const KakaoAuthButton: React.FC = () => {
  const router = useRouter();

  const handleKakaoLogin = () => {
    router.push(KAKAO_AUTHORIZE_URL);
  };

  return (
    <Button className='border-none bg-kakao' onClick={handleKakaoLogin}>
      <div className='flex items-center gap-1'>
        <Image src='/image/kakao.png' alt='kakao login' width={16} height={16} />
        <span className='text-detail text-black'>로그인</span>
      </div>
    </Button>
  );
};

export default KakaoAuthButton;
