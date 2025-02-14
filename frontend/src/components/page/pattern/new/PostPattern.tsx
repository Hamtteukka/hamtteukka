'use client';

import { H4 } from '@/components/typography/Heading';
import ConfirmDialog from '@/components/ui/dialog/ConfirmDialog';
import TextInput from '@/components/ui/input/TextInput';
import useTextInput from '@/hooks/useTextInput';
import { createFeed } from '@/service/newFeed';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PPostPattern {
  base64img: string;
  content?: string;
}

const PostPattern: React.FC<PPostPattern> = ({ base64img, content = '' }) => {
  const [title, setTitle] = useTextInput('');
  const [imageId, setImageId] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    // TODO: base64img을 어떻게 전달해야 하는가?
  }, [base64img]);

  const post = async () => {
    if (!title) {
      alert('도안의 제목을 입력해 주세요!');
      return;
    }

    const formData = new FormData();
    formData.append('feedType', 'PATTERN');
    formData.append('title', title);
    formData.append('images[0]', base64img);

    if (content) {
      formData.append('content', content);
    }

    // TODO: 게시물 생성 후 상세 페이지로 이동
    const { feedId } = await createFeed(formData);
    alert(`${feedId}번 게시물의 상세 페이지로 이동 (아직 구현 안됨, 임시 알림)`);
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
