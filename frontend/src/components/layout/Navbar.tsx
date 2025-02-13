'use client';

import Image from 'next/image';
import AlertIcon from '/public/svg/alertIcon.svg';
import logo from '/public/logo/logo.png';
import fullLogo from '/public/logo/full_logo.png';
import { navigationList } from '@/lib/navigation';
import NavItem from './NavItem';
import KakaoAuthButton from '@/components/page/auth/KakaoAuthButton';
import { useUserStore } from '@/store/loginUser';
import { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
  const { isLogin, logout } = useUserStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className='min-h-screen w-64 border-r bg-white'>
      {isClient && (
        <div className='fixed flex h-screen w-64 flex-col gap-8 px-4 py-10'>
          <header className='flex items-center justify-between'>
            {/* <Image width={50} height={50} src={logo} alt='함뜨까 로고' /> */}
            <Image width={128} height={50} src={fullLogo} alt='함뜨까 로고' />
            {isLogin ? <AlertIcon height='24' width='24' className='cursor-pointer' /> : <KakaoAuthButton />}
          </header>

          <ul>
            {navigationList.map((item: TNavigation) => (
              <NavItem key={item.title} {...item} />
            ))}
          </ul>

          {isLogin && (
            <footer className='flex grow items-end self-end'>
              <div onClick={logout} className='cursor-pointer text-detail underline'>
                로그아웃
              </div>
            </footer>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
