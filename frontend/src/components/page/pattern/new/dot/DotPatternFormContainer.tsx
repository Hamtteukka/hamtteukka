import DotPatternForm from '@/components/page/pattern/new/dot/DotPatternForm';

const DotPatternFormContainer: React.FC = () => {
  return (
    <section className='flex flex-col gap-4'>
      <p className='text-detail text-deepgray'>도트 도안 - 참고 이미지와 비슷한 도트 도안이 생성돼요.</p>
      <DotPatternForm />
    </section>
  );
};

export default DotPatternFormContainer;
