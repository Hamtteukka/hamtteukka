import DotPatternForm from '@/components/page/pattern/new/dot/DotPatternForm';

const DotPatternFormContainer: React.FC = () => {
  return (
    <section className='flex grow flex-col gap-4'>
      <p className='text-detail text-deepgray'>도트 도안 - 참고 이미지와 비슷한 도트 도안이 생성돼요.</p>
      <p className='text-detail text-deepgray -mt-[15px]'>대바늘은 다양한 색상을 사용할 경우 난이도가 높아져요!</p>
      <DotPatternForm />
    </section>
  );
};

export default DotPatternFormContainer;
