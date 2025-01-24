'use client';

import { useState } from 'react';
import SelectCard from './SelectCard';
import TextPatternFormContainer from '@/components/pattern/new/text/TextPatternFormContainer';
import DotPatternFormContainer from '@/components/pattern/new/dot/DotPatternFormContainer';
import PatternTypeContext from '@/components/context/PatternTypeContext';

const NewPatternForm = () => {
  const [patternType, setPatternType] = useState<'select' | 'text' | 'dot'>('select');

  return patternType === 'select' ? (
    <section className='flex h-full grow items-center justify-between'>
      <button onClick={() => setPatternType('text')}>
        <SelectCard type='text' />
      </button>
      <button onClick={() => setPatternType('dot')}>
        <SelectCard type='dot' />
      </button>
    </section>
  ) : (
    <div className='flex flex-col gap-4'>
      <PatternTypeContext.Provider value={setPatternType}>
        {patternType === 'text' ? <TextPatternFormContainer /> : <DotPatternFormContainer />}
      </PatternTypeContext.Provider>
    </div>
  );
};

export default NewPatternForm;
