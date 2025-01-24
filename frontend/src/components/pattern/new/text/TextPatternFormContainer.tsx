import TextPatternForm from '@/components/pattern/new/text/TextPatternForm';

const TextPatternFormContainer: React.FC = () => {
  return (
    <section className='flex flex-col gap-4'>
      <p className='text-detail text-deepgray'>서술형 도안 - 예상 결과 이미지와 서술형 도안이 생성돼요.</p>
      <TextPatternForm />
    </section>
  );
};

export default TextPatternFormContainer;
