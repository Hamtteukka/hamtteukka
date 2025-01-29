'use client';

import { getKakaoToken } from '@/service/auth';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const AuthCallback: React.FC = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const handleKakaoLogin = async () => {
    if (!code) throw new Error('카카오 인가 코드가 존재하지 않습니다.');
    await getKakaoToken(code);
  };

  useEffect(() => {
    handleKakaoLogin();
  }, []);

  return <>{code}</>;
};

export default AuthCallback;
