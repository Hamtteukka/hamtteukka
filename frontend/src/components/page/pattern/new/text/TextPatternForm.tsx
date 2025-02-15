'use client';

import LabeledInput from '@/components/page/pattern/new/LabeledInput';
import CraftInput from '@/components/page/pattern/new/text/CraftInput';
import DetailInput from '@/components/page/pattern/new/text/DetailInput';
import NeedleInput from '@/components/page/pattern/new/text/NeedleInput';
import Button from '@/components/ui/button/Button';
import NewPatternLanding from '@/components/ui/landing/NewPatternLanding';
import { usePatternContext } from '@/hooks/usePatternContext';
import { usePatternPostContext } from '@/hooks/usePatternPostContext';
import { useSetPatternTypeContext } from '@/hooks/useSetPatternTypeContext';
import useTextInput from '@/hooks/useTextInput';
import { AI_GENERATION_TOTAL_COUNT, PATTERN_PAGE } from '@/lib/constants/pattern';
import { patternInput } from '@/lib/pattern';
import { generateTextPattern } from '@/service/pattern';
import { useAiGenerationRemainingCount } from '@/store/remainingPatternCount';
import { TTextPatternInstruction } from '@/types/pattern';
import { useState } from 'react';

const TextPatternForm: React.FC = () => {
  const { needle, craft, setNeedle, setCraft } = usePatternPostContext();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [detail, setDetail] = useTextInput<HTMLTextAreaElement>('');

  const { count, subCount } = useAiGenerationRemainingCount();

  const setPatterType = useSetPatternTypeContext();
  const patternContext = usePatternContext();

  const submit = async (): Promise<void> => {
    if (!craft) {
      alert('작품 종류를 선택해주세요.');
      return;
    }

    const body: TTextPatternInstruction = {
      needle,
      work: craft,
      detail,
    };

    setIsPending(true);
    try {
      const data = await generateTextPattern(body);
      patternContext.setTextPattern({ description: data.description, expectedImage: data.expectedImage });
      subCount();
      setPatterType(PATTERN_PAGE.TEXT_RESULT);
    } catch (e) {
      alert('도안 생성 중 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.');
      setIsPending(false);
    }
  };

  return isPending ? (
    <NewPatternLanding message='도안을 만들고 있어요...' />
  ) : (
    <form className='flex flex-col gap-4' onSubmit={(e) => e.preventDefault()}>
      <LabeledInput label={patternInput.needle.label} input={<NeedleInput needle={needle} setNeedle={setNeedle} />} />
      <LabeledInput label={patternInput.craftType.label} input={<CraftInput craft={craft} setCraft={setCraft} />} />
      <LabeledInput
        label={patternInput.detail.label}
        help={patternInput.detail.help}
        input={<DetailInput value={detail} onChange={setDetail} />}
      />
      <div className='flex gap-2.5 self-end'>
        <Button type='outlined' onClick={() => setPatterType(PATTERN_PAGE.SELECT)}>
          이전
        </Button>
        <Button onClick={submit}>
          생성 ({count}/{AI_GENERATION_TOTAL_COUNT})
        </Button>
      </div>
    </form>
  );
};

export default TextPatternForm;
