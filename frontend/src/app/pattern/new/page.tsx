import NewPatternForm from '@/components/page/pattern/new/NewPatternForm';
import { H1 } from '@/components/typography/Heading';

const NewPatternPage: React.FC = () => {
  return (
    <div className='mx-auto flex h-full w-base flex-col gap-4'>
      <H1>AI 도안 생성</H1>
      <NewPatternForm />
    </div>
  );
};

export default NewPatternPage;
