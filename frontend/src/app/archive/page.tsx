import Archive from '@/components/page/archive/Archive';
import { H1 } from '@/components/typography/Heading';

const page: React.FC = () => {
  return (
    <div className='mx-auto flex h-full w-base flex-col gap-4'>
      <H1>아카이브</H1>
      <Archive />
    </div>
  );
};

export default page;
