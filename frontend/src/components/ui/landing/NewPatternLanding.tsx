import Image from 'next/image';
import logo from '/public/logo/logo.png';
import { H4 } from '@/components/typography/Heading';

interface PNewPatternLanding {
  message: string;
}

const NewPatternLanding: React.FC<PNewPatternLanding> = ({ message }) => {
  return (
    <section className='flex h-full grow flex-col items-center justify-center gap-6'>
      <div className='animate-bounceY'>
        <Image src={logo} alt='함뜨까 로고' width={160} height={140} />
      </div>
      <H4 className='text-center'>
        {message}
        <br />
        페이지를 나가지 말고 기다려 주세요!
      </H4>
    </section>
  );
};

export default NewPatternLanding;
