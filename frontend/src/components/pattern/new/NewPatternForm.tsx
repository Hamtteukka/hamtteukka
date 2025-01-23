'use client';

import { useState } from 'react';
import SelectCard from './SelectCard';
import TextPatternFormContainer from '@/components/pattern/new/text/TextPatternFormContainer';
import DotPatternFormContainer from '@/components/pattern/new/dot/DotPatternFormContainer';

const NewPatternForm = () => {
  const [patternType, setPatterType] = useState<'text' | 'dot'>();

  return !patternType ? (
    <section className='flex h-full grow items-center justify-between'>
      <button onClick={() => setPatterType('text')}>
        <SelectCard type='text' />
      </button>
      <button onClick={() => setPatterType('dot')}>
        <SelectCard type='dot' />
      </button>
    </section>
  ) : patternType === 'text' ? (
    <TextPatternFormContainer />
  ) : (
    <DotPatternFormContainer />
  );
};

export default NewPatternForm;
