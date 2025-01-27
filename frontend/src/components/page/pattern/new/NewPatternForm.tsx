'use client';

import { useState } from 'react';
import SelectCard from './SelectCard';
import TextPatternFormContainer from '@/components/page/pattern/new/text/TextPatternFormContainer';
import DotPatternFormContainer from '@/components/page/pattern/new/dot/DotPatternFormContainer';
import PatternTypeContext from '@/components/context/PatternTypeContext';
import { TPattern } from '@/types/pattern';
import { PatternProvider } from '@/components/context/PatternContext';
import { PATTERN_PAGE } from '@/lib/constants/pattern';
import TextResult from '@/components/page/pattern/new/text/TextResult';
import DotResult from '@/components/page/pattern/new/dot/DotResult';

const NewPatternForm = () => {
  const [patternType, setPatternType] = useState<TPattern>(PATTERN_PAGE.SELECT);

  const Children = () => {
    switch (patternType) {
      case PATTERN_PAGE.TEXT_RESULT:
        return <TextResult />;
      case PATTERN_PAGE.DOT_RESULT:
        return <DotResult />;
      default:
        return (
          <>
            <p className='font-bold text-deepgray'>어떤 도안을 생성하고 싶으신가요?</p>
            {patternType === PATTERN_PAGE.SELECT ? (
              <section className='flex h-full grow items-center justify-between'>
                <button onClick={() => setPatternType(PATTERN_PAGE.TEXT)}>
                  <SelectCard type={PATTERN_PAGE.TEXT} />
                </button>
                <button onClick={() => setPatternType(PATTERN_PAGE.DOT)}>
                  <SelectCard type={PATTERN_PAGE.DOT} />
                </button>
              </section>
            ) : patternType === PATTERN_PAGE.TEXT ? (
              <TextPatternFormContainer />
            ) : (
              <DotPatternFormContainer />
            )}
          </>
        );
    }
  };

  return (
    <PatternProvider>
      <PatternTypeContext.Provider value={setPatternType}>
        <Children />
      </PatternTypeContext.Provider>
    </PatternProvider>
  );
};

export default NewPatternForm;
