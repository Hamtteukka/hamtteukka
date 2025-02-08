'use client';

import Image from 'next/image';
import AlertIcon from '/public/svg/alertIcon.svg';
import logo from '/public/logo/logo.png';
import fullLogo from '/public/logo/full_logo.png';
import { navigationList } from '@/lib/navigation';
import NavItem from './NavItem';
import KakaoAuthButton from '@/components/page/auth/KakaoAuthButton';
import { useLoginUser } from '@/store/loginUser';

const Navbar: React.FC = () => {
  const { isLogin } = useLoginUser();

  return (
    <nav className='min-h-screen w-64 border-r bg-white'>
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
      </div>
    </nav>
  );
};

export default Navbar;
