'use client';

import LabeledInput from '@/components/page/pattern/new/LabeledInput';
import CraftInput from '@/components/page/pattern/new/text/CraftInput';
import DetailInput from '@/components/page/pattern/new/text/DetailInput';
import NeedleInput from '@/components/page/pattern/new/text/NeedleInput';
import Button from '@/components/ui/button/Button';
import { useSetPatternTypeContext } from '@/hooks/useSetPatternTypeContext';
import useTextInput from '@/hooks/useTextInput';
import { NEEDLE_TYPE, PATTERN_PAGE } from '@/lib/constants/pattern';
import { patternInput } from '@/lib/pattern';
import { TCraftTypeKr, TNeedle } from '@/types/pattern';
import { useState } from 'react';

const TextPatternForm: React.FC = () => {
  const [needle, setNeedle] = useState<TNeedle>(NEEDLE_TYPE.knitting);
  const [craft, setCraft] = useState<TCraftTypeKr>();
  const [details, seDetails] = useTextInput<HTMLTextAreaElement>('');

  const setPatterType = useSetPatternTypeContext();

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
        <Button type='outlined' onClick={() => setPatterType(PATTERN_PAGE.SELECT)}>
          이전
        </Button>
        <Button onClick={() => {}}>생성 (3/3)</Button>
      </div>
    </form>
  );
};

export default TextPatternForm;
