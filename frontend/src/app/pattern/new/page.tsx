import NewPatternForm from '@/components/page/pattern/new/NewPatternForm';
import { H1 } from '@/components/typography/Heading';

const NewPatternPage: React.FC = () => {
  return (
    <div className='h-screen'>
      <div className='flex h-full flex-col gap-2 overflow-y-auto px-10 py-10'>
        <H1>AI 도안 생성</H1>
        <NewPatternForm />
      </div>
    </div>
  );
};

export default NewPatternPage;
