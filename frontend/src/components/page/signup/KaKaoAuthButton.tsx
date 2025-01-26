'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button/Button';
import Image from 'next/image';

const KaKaoAuthButton: React.FC = () => {
  const router = useRouter();

  const handleKaKaoLogin = () => {
    router.push('/signup');

    // TODO: 카카오 로그인 API 요청
    // router.push(`${process.env.NEXT_PUBLIC_KAKAO_API_URL}/auth/kakao`);
  };

  return (
    <Button className='bg-kakao border-none' onClick={handleKaKaoLogin}>
      <div className='flex items-center gap-2'>
        <Image src='/image/kakao.png' alt='kakao login' width={16} height={16} />
        <span className='text-detail text-black'>로그인</span>
      </div>
    </Button>
  );
};

export default KaKaoAuthButton;
