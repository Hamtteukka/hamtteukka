import TextPatternForm from '@/components/page/pattern/new/text/TextPatternForm';

const TextPatternFormContainer: React.FC = () => {
  return (
    <section className='flex grow flex-col gap-4'>
      <p className='text-detail text-deepgray'>서술형 도안 - 예상 결과 이미지와 서술형 도안이 생성돼요.</p>
      <p className='text-detail text-deepgray -mt-[15px]'>서술형 도안 생성에 약 1~2분 정도 소요됩니다.</p>
      <TextPatternForm />
    </section>
  );
};

export default TextPatternFormContainer;
