import NewPatternForm from '@/components/pattern/new/NewPatternForm';
import { H1 } from '@/components/typography/Heading';

const NewPatternPage: React.FC = () => {
  return (
    <div className='mx-auto flex h-full w-base flex-col gap-4'>
      {/* <div className='flex flex-col gap-4'> */}
      <H1>AI 도안 생성</H1>
      {/* <p className='font-bold text-deepgray'>어떤 도안을 생성하고 싶으신가요?</p>
      </div> */}
      <NewPatternForm />
    </div>
  );
};

export default NewPatternPage;
