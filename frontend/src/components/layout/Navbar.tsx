import Image from 'next/image';
import AlertIcon from '/public/svg/alertIcon.svg';
import logo from '/public/logo/logo.png';
import { navigationList } from '@/lib/navigation';
import NavItem from './NavItem';

const Navbar: React.FC = () => {
  return (
    <nav className='min-h-screen w-64 border-r bg-white'>
      <div className='fixed flex h-screen w-64 flex-col gap-8 px-4 py-10'>
        <header className='flex items-center justify-between'>
          <Image width={40} height={40} src={logo} alt='함뜨까 로고' />
          <AlertIcon height='24' width='24' />
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
