import Image from 'next/image';
import logo from '/public/logo/logo.png';

const NoDataIndicator: React.FC = () => {
  return (
    <div className='flex grow flex-col items-center justify-center gap-4'>
      <Image src={logo} alt='함뜨까 로고' width={120} height={120} />
      <p>텅 비었습니다.</p>
    </div>
  );
};

export default NoDataIndicator;
