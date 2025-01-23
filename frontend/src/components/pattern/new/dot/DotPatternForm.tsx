'use client';

import ColorNumInput from '@/components/pattern/new/dot/ColorNumInput';
import SizeInput from '@/components/pattern/new/dot/SizeInput';
import LabeledInput from '@/components/pattern/new/LabeledInput';
import { colorNum, sizeNum } from '@/lib/constants/pattern';
import { patternInput } from '@/lib/pattern';
import { useState } from 'react';

const DotPatternForm: React.FC = () => {
  const [width, setWidth] = useState<number>(sizeNum.default);
  const [height, setHeight] = useState<number>(sizeNum.default);
  const [num, setNum] = useState<number>(colorNum.default);

  return (
    <form className='flex flex-col gap-4'>
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
    </form>
  );
};

export default DotPatternForm;
