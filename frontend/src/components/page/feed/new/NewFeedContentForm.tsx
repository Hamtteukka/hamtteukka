'use client';

import Button from '@/components/ui/button/Button';
import LabeledInput from '@/components/page/pattern/new/LabeledInput';
import { craftTypeKrToEn, patternInput } from '@/lib/pattern';
import NeedleInput from '@/components/page/pattern/new/text/NeedleInput';
import CraftInput from '@/components/page/pattern/new/text/CraftInput';
import TextArea from '@/components/ui/input/TextArea';
import TextInput from '@/components/ui/input/TextInput';
import { useRouter } from 'next/navigation';
import AIPatternInput from '@/components/page/feed/new/AIPatternInput';
import { useNewFeedContext } from '@/hooks/useNewFeedContext';
import { CRAFT_NUM, NEEDLE_NUM } from '@/lib/constants/post';
import { createFeed } from '@/service/newFeed';

const NewFeedContentForm: React.FC = () => {
  const {
    image: { files, count },
    content: { needle, craft, title, detail, setNeedle, setCraft, setTitle, setDetail },
  } = useNewFeedContext();

  const router = useRouter();

  const submit = async () => {
    if (count === 0) {
      alert('이미지를 1개 이상 등록해 주세요.');
      return;
    }

    if (!craft) {
      alert('작품 종류를 선택해 주세요.');
      return;
    }

    if (!title) {
      alert('제목을 입력해 주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('feedType', 'NORMAL');
    formData.append('title', title);
    formData.append('content', detail);
    formData.append('categoryIds[0]', NEEDLE_NUM[needle].toString());
    formData.append('categoryIds[1]', CRAFT_NUM[craftTypeKrToEn[craft]].toString());

    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    // TODO: 게시물 생성 후 마이페이지로 이동
    const { feedId } = await createFeed(formData);
    alert(feedId + '번 게시물 등록 성공! (임시 알림)');
    router.push('/');
  };

  const cancel = () => {
    router.back();
  };

  return (
    <div className='flex w-3/5 flex-col gap-4 overflow-y-auto border-l bg-white px-10 py-10'>
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
        input={<TextInput value={title} onChange={setTitle} placeholder='제목을 작성해 주세요.' />}
        vertical={true}
      />
      <LabeledInput
        label='내용'
        input={<TextArea value={detail} onChange={setDetail} minHeight={144} placeholder='내용을 작성해 주세요.' />}
        vertical={true}
      />
      <LabeledInput label='AI 도안 임베드' input={<AIPatternInput />} vertical={true} />
      <div className='flex justify-end gap-2.5'>
        <Button onClick={submit}>등록</Button>
        <Button onClick={cancel} type='outlined'>
          취소
        </Button>
      </div>
    </div>
  );
};

export default NewFeedContentForm;
