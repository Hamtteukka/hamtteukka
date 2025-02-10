'use client';

import Button from '@/components/ui/button/Button';
import LabeledInput from '../../pattern/new/LabeledInput';
import { useState } from 'react';
import { TCraftTypeKr, TNeedle } from '@/types/pattern';
import { NEEDLE_TYPE } from '@/lib/constants/pattern';
import { patternInput } from '@/lib/pattern';
import NeedleInput from '@/components/page/pattern/new/text/NeedleInput';
import CraftInput from '@/components/page/pattern/new/text/CraftInput';
import useTextInput from '@/hooks/useTextInput';
import TextArea from '@/components/ui/input/TextArea';
import TextInput from '@/components/ui/input/TextInput';
import { useRouter } from 'next/navigation';
import AIPatternInput from './AIPatternInput';

const NewFeedContentForm: React.FC = () => {
  const [needle, setNeedle] = useState<TNeedle>(NEEDLE_TYPE.knitting);
  const [craft, setCraft] = useState<TCraftTypeKr>();
  const [title, setTitle] = useTextInput<HTMLInputElement>('');
  const [detail, setDetail] = useTextInput<HTMLTextAreaElement>('');

  const router = useRouter();

  const submit = () => {};
  const cancel = () => {
    router.back();
  };

  return (
    <div className='flex w-3/5 flex-col gap-4 border-l bg-white px-10 py-10'>
      <div className='flex justify-end gap-2.5'>
        <Button onClick={submit}>등록</Button>
        <Button onClick={cancel} type='outlined'>
          취소
        </Button>
      </div>
      <LabeledInput
        label={patternInput.needle.label}
        input={<NeedleInput needle={needle} setNeedle={setNeedle} />}
        vertical={true}
      />
      <LabeledInput
        label={patternInput.craftType.label}
        input={<CraftInput craft={craft} setCraft={setCraft} />}
        vertical={true}
      />
      <LabeledInput
        label='제목'
        input={<TextInput onChange={setTitle} placeholder='제목을 작성해 주세요.' />}
        vertical={true}
      />
      <LabeledInput
        label='내용'
        input={<TextArea onChange={setDetail} minHeight={144} placeholder='내용을 작성해 주세요.' />}
        vertical={true}
      />
      <LabeledInput label='AI 도안 임베드' input={<AIPatternInput />} vertical={true} />
    </div>
  );
};

export default NewFeedContentForm;
