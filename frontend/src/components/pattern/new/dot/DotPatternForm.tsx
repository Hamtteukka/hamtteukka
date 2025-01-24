'use client';

import PatternTypeContext from '@/components/context/PatternTypeContext';
import ColorNumInput from '@/components/pattern/new/dot/ColorNumInput';
import ImageInput from '@/components/pattern/new/dot/ImageInput';
import SizeInput from '@/components/pattern/new/dot/SizeInput';
import LabeledInput from '@/components/pattern/new/LabeledInput';
import Button from '@/components/ui/button/Button';
import { colorNum, sizeNum } from '@/lib/constants/pattern';
import { patternInput } from '@/lib/pattern';
import { useContext, useState } from 'react';

const DotPatternForm: React.FC = () => {
  const [width, setWidth] = useState<number>(sizeNum.default);
  const [height, setHeight] = useState<number>(sizeNum.default);
  const [num, setNum] = useState<number>(colorNum.default);

  const setPatterType = useContext(PatternTypeContext);
  if (!setPatterType) {
    throw new Error('useContext must be used within a PatternTypeProvider');
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={(e) => e.preventDefault()}>
      <LabeledInput
        label={patternInput.size.label}
        help={patternInput.size.help}
        input={<SizeInput width={width} height={height} setWidth={setWidth} setHeight={setHeight} />}
      />
      <LabeledInput
        label={patternInput.color.label}
        help={patternInput.color.help}
        input={<ColorNumInput num={num} setNum={setNum} />}
      />
      <LabeledInput label={patternInput.image.label} help={patternInput.image.help} input={<ImageInput />} />
      <div className='flex gap-2.5 self-end'>
        <Button type='outlined' onClick={() => setPatterType('select')}>
          이전
        </Button>
        <Button onClick={() => {}}>생성 (3/3)</Button>
      </div>
    </form>
  );
};

export default DotPatternForm;
