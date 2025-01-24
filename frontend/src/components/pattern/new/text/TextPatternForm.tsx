'use client';

import PatternTypeContext from '@/components/context/PatternTypeContext';
import ImageInput from '@/components/pattern/new/dot/ImageInput';
import LabeledInput from '@/components/pattern/new/LabeledInput';
import CraftInput from '@/components/pattern/new/text/CraftInput';
import DetailInput from '@/components/pattern/new/text/DetailInput';
import NeedleInput from '@/components/pattern/new/text/NeedleInput';
import Button from '@/components/ui/button/Button';
import useTextInput from '@/hooks/useTextInput';
import { NEEDLE_TYPE } from '@/lib/constants/pattern';
import { patternInput } from '@/lib/pattern';
import { TCraftTypeKr, TNeedle } from '@/types/pattern';
import { useContext, useState } from 'react';

const TextPatternForm: React.FC = () => {
  const [needle, setNeedle] = useState<TNeedle>(NEEDLE_TYPE.knitting);
  const [craft, setCraft] = useState<TCraftTypeKr>();
  const [details, seDetails] = useTextInput<HTMLTextAreaElement>('');

  const setPatterType = useContext(PatternTypeContext);
  if (!setPatterType) {
    throw new Error('useContext must be used within a PatternTypeProvider');
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={(e) => e.preventDefault()}>
      <LabeledInput label={patternInput.needle.label} input={<NeedleInput needle={needle} setNeedle={setNeedle} />} />
      <LabeledInput label={patternInput.craftType.label} input={<CraftInput craft={craft} setCraft={setCraft} />} />
      <LabeledInput
        label={patternInput.details.label}
        help={patternInput.details.help}
        input={<DetailInput onChange={seDetails} />}
      />
      <div className='flex gap-2.5 self-end'>
        <Button type='outlined' onClick={() => setPatterType('select')}>
          이전
        </Button>
        <Button onClick={() => {}}>생성 (3/3)</Button>
      </div>
    </form>
  );
};

export default TextPatternForm;
