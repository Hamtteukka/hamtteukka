'use client';

import ColorNumInput from '@/components/page/pattern/new/dot/ColorNumInput';
import ImageInput from '@/components/ui/input/ImageInput';
import SizeInput from '@/components/page/pattern/new/dot/SizeInput';
import LabeledInput from '@/components/page/pattern/new/LabeledInput';
import Button from '@/components/ui/button/Button';
import NewPatternLanding from '@/components/ui/landing/NewPatternLanding';
import { usePatternContext } from '@/hooks/usePatternContext';
import { useSetPatternTypeContext } from '@/hooks/useSetPatternTypeContext';
import { COLOR_NUM, AI_GENERATION_TOTAL_COUNT, PATTERN_PAGE, SIZE_NUM } from '@/lib/constants/pattern';
import { patternInput } from '@/lib/pattern';
import { generateDotPattern } from '@/service/pattern';
import { useState } from 'react';
import { useAiGenerationRemainingCount } from '@/store/remainingPatternCount';
import CheckboxIcon from '@/components/ui/icons/CheckboxIcon';

const DotPatternForm: React.FC = () => {
  const [width, setWidth] = useState<number>(SIZE_NUM.DEFAULT_SIZE);
  const [height, setHeight] = useState<number>(SIZE_NUM.DEFAULT_SIZE);
  const [colorNum, setColorNum] = useState<number>(COLOR_NUM.DEFAULT_COLOR_NUM);
  const [image, setImage] = useState<File | null>(null);
  const [imageBackground, setImageBackground] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const { count, subCount } = useAiGenerationRemainingCount();

  const setPatterType = useSetPatternTypeContext();
  const patternContext = usePatternContext();

  const submit = async (): Promise<void> => {
    if (!image) {
      alert('참고 이미지를 등록해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('width', width.toString());
    formData.append('height', height.toString());
    formData.append('nColors', colorNum.toString());
    formData.append('file', image);
    formData.append('background', imageBackground.toString());

    setIsPending(true);
    try {
      const data = await generateDotPattern(formData);
      patternContext.setDotPattern({ dotImage: data.dotImage });
      subCount();
      setPatterType(PATTERN_PAGE.DOT_RESULT);
    } catch (e) {
      alert('도안 생성 중 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.');
      setIsPending(false);
    }
  };

  return isPending ? (
    <NewPatternLanding message='도안을 만들고 있어요...' />
  ) : (
    <form className='flex flex-col gap-4' onSubmit={(e) => e.preventDefault()}>
      <LabeledInput
        label={patternInput.size.label}
        help={patternInput.size.help}
        input={<SizeInput width={width} height={height} setWidth={setWidth} setHeight={setHeight} />}
      />
      <LabeledInput
        label={patternInput.color.label}
        help={patternInput.color.help}
        input={<ColorNumInput num={colorNum} setNum={setColorNum} />}
      />
      <LabeledInput
        label={patternInput.image.label}
        help={patternInput.image.help}
        input={
          <div className='flex flex-col items-start gap-2'>
            <ImageInput
              file={image}
              setFile={setImage}
              description='AI가 참고할 이미지를 첨부해 주세요.'
              className='h-72 w-full'
            />
            <button className='flex items-center gap-1' onClick={() => setImageBackground((prev) => !prev)}>
              <CheckboxIcon checked={imageBackground} />
              <span className='text-body2 font-bold'>이미지 배경 삭제</span>
            </button>
          </div>
        }
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

export default DotPatternForm;
