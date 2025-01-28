import LabeledInput from '@/components/page/pattern/new/LabeledInput';
import Button from '@/components/ui/button/Button';
import { usePatternContext } from '@/hooks/usePatternContext';
import { useSetPatternTypeContext } from '@/hooks/useSetPatternTypeContext';
import { PATTERN_PAGE } from '@/lib/constants/pattern';
import Image from 'next/image';

const DotResult: React.FC = () => {
  const patternContext = usePatternContext();
  const setPatternTypeContext = useSetPatternTypeContext();

  const reGenerate = () => {
    if (confirm('도안을 다시 생성 하시겠습니까?\n현재 도안은 사라집니다.')) setPatternTypeContext(PATTERN_PAGE.SELECT);
  };

  const save = () => {};

  return (
    <section className='flex flex-col gap-8'>
      <LabeledInput
        label='도트 도안'
        input={
          <Image
            className='rounded-sm'
            src={patternContext.dotPattern.dotPattern}
            alt='도트 도안'
            width={500}
            height={500}
          />
        }
      />
      <div className='flex justify-end gap-2.5'>
        <Button onClick={reGenerate} type='outlined'>
          다시 생성하기 (2/3)
        </Button>
        <Button onClick={save}>도안 저장</Button>
      </div>
    </section>
  );
};

export default DotResult;
