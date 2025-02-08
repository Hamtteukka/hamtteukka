import NewPatternForm from '@/components/page/pattern/new/NewPatternForm';
import { H1 } from '@/components/typography/Heading';

const NewPatternPage: React.FC = () => {
  return (
    <div className='flex flex-col gap-2 px-10'>
      <H1>AI 도안 생성</H1>
      <NewPatternForm />
    </div>
  );
};

export default NewPatternPage;
