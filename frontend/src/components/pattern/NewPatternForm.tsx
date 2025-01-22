'use client';

import { useState } from 'react';
import SelectCard from './SelectCard';
import TextPatternForm from '@/components/pattern/TextPatternForm';
import DotPatternForm from '@/components/pattern/DotPatternForm';

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
    <TextPatternForm />
  ) : (
    <DotPatternForm />
  );
};

export default NewPatternForm;
