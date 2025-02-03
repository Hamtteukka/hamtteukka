import LabeledInput from '@/components/page/pattern/new/LabeledInput';
import PostPattern from '@/components/page/pattern/new/PostPattern';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { usePatternContext } from '@/hooks/usePatternContext';
import { useSetPatternTypeContext } from '@/hooks/useSetPatternTypeContext';
import { AI_GENERATION_TOTAL_COUNT, PATTERN_PAGE } from '@/lib/constants/pattern';
import { useAiGenerationRemainingCount } from '@/store/remainingPatternCount';
import Image from 'next/image';

const DotResult: React.FC = () => {
  const { count } = useAiGenerationRemainingCount();

  const patternContext = usePatternContext();
  const setPatternTypeContext = useSetPatternTypeContext();

  const { isOpen, openModal } = useModal();

  const reGenerate = () => {
    if (confirm('도안을 다시 생성 하시겠습니까?\n현재 도안은 사라집니다.')) setPatternTypeContext(PATTERN_PAGE.SELECT);
  };

  return (
    <>
      <section className='flex flex-col gap-8'>
        <LabeledInput
          label='도트 도안'
          input={
            <Image
              className='rounded-sm'
              src={`data:image/png;base64,${patternContext.dotPattern.dotImage}`}
              alt='도트 도안'
              width={500}
              height={500}
            />
          }
        />
        <div className='flex justify-end gap-2.5'>
          <Button onClick={reGenerate} type='outlined'>
            다시 생성하기 ({count}/{AI_GENERATION_TOTAL_COUNT})
          </Button>
          <Button onClick={openModal}>도안 게시</Button>
        </div>
      </section>
      {isOpen && <PostPattern base64img={patternContext.dotPattern.dotImage} />}
    </>
  );
};

export default DotResult;
