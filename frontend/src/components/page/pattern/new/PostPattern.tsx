'use client';

import { H4 } from '@/components/typography/Heading';
import ConfirmDialog from '@/components/ui/dialog/ConfirmDialog';
import TextInput from '@/components/ui/input/TextInput';
import { usePatternPostContext } from '@/hooks/usePatternPostContext';
import useTextInput from '@/hooks/useTextInput';
import { CRAFT_NUM, NEEDLE_NUM } from '@/lib/constants/post';
import { craftTypeKrToEn } from '@/lib/pattern';
import { createAIFeed } from '@/service/newFeed';
import { TPatternPost } from '@/types/pattern';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PPostPattern {
  base64img: string;
  content?: string;
}

const PostPattern: React.FC<PPostPattern> = ({ base64img, content }) => {
  const { needle, craft } = usePatternPostContext();
  const [title, setTitle] = useTextInput('');

  const router = useRouter();

  const post = async () => {
    if (!title) {
      alert('도안의 제목을 입력해 주세요!');
      return;
    }

    const patternPost: TPatternPost = {
      base64Image: 'data:image/png;base64,' + base64img,
      title,
      content: content || '',
    };

    if (craft) {
      patternPost.categoryIds = [NEEDLE_NUM[needle], CRAFT_NUM[craftTypeKrToEn[craft]]];
    }

    const { feedId } = await createAIFeed(patternPost);
    router.push(`/feed/${feedId}`);
  };

  return (
    <ConfirmDialog onConfirm={post} confirmText='게시'>
      <div className='mx-2 flex flex-col gap-4'>
        <H4>게시물의 제목을 입력해주세요.</H4>
        <Image
          className='w-[20rem]'
          src={`data:image/png;base64,${base64img}`}
          alt='도안 이미지'
          width={320}
          height={320}
        />
        <TextInput placeholder='게시물 제목' onChange={setTitle} />
      </div>
    </ConfirmDialog>
  );
};

export default PostPattern;
