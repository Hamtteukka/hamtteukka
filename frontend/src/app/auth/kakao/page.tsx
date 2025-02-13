'use client';

import { getKakaoToken } from '@/service/auth';
import { useUserStore } from '@/store/loginUser';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthCallback: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const { login } = useUserStore();

  const handleKakaoLogin = async () => {
    if (!code) throw new Error('카카오 인가 코드가 존재하지 않습니다.');
    const data = await getKakaoToken(code);

    if (data.user) {
      login(data.user);
    }

    router.replace(data.url);
  };

  useEffect(() => {
    handleKakaoLogin();
  }, []);

  return <></>;
};

export default AuthCallback;
