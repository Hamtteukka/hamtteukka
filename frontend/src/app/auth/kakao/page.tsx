'use client';

import { getKakaoToken } from '@/service/auth';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthCallback: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const handleKakaoLogin = async () => {
    if (!code) throw new Error('카카오 인가 코드가 존재하지 않습니다.');
    const { url } = await getKakaoToken(code);
    router.replace(url);
  };

  useEffect(() => {
    handleKakaoLogin();
  }, []);

  return <></>;
};

export default AuthCallback;
