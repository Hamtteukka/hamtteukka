'use client';

import { useState } from 'react';
import SelectCard from './SelectCard';
import TextPatternFormContainer from '@/components/page/pattern/new/text/TextPatternFormContainer';
import DotPatternFormContainer from '@/components/page/pattern/new/dot/DotPatternFormContainer';
import PatternTypeContext from '@/components/context/PatternTypeContext';
import { TPattern } from '@/types/pattern';
import Image from 'next/image';
import logo from '/public/logo/logo.png';
import { H4 } from '@/components/typography/Heading';

const NewPatternForm = () => {
  const [patternType, setPatternType] = useState<TPattern>('result');

  switch (patternType) {
    case 'result':
      return (
        <section className='flex h-full grow flex-col items-center justify-center gap-6'>
          <div className='animate-bounceY'>
            <Image src={logo} alt='함뜨까 로고' width={160} height={140} />
          </div>
          <H4 className='text-center'>
            도안을 만들고 있어요...
            <br />
            페이지를 나가지 말고 기다려 주세요!
          </H4>
        </section>
      );
    default:
      return (
        <>
          <p className='font-bold text-deepgray'>어떤 도안을 생성하고 싶으신가요?</p>
          {patternType === 'select' ? (
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
          )}
        </>
      );
  }
};

export default NewPatternForm;
