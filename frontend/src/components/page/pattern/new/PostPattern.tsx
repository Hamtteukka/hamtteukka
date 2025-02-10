'use client';

import { H4 } from '@/components/typography/Heading';
import ConfirmDialog from '@/components/ui/dialog/ConfirmDialog';
import TextInput from '@/components/ui/input/TextInput';
import useTextInput from '@/hooks/useTextInput';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface PPostPattern {
  base64img: string;
  content?: string;
}

const PostPattern: React.FC<PPostPattern> = ({ base64img, content = '' }) => {
  const [title, setTitle] = useTextInput('');
  const [imageId, setImageId] = useState<string[]>([]);

  useEffect(() => {
    // TODO: s3에 등록 후 id 받아와서 setImageId 해주는 작업 필요
  }, [base64img]);

  const post = () => {
    // TODO: 게시 api 호출
    // TODO: 게시 성공하면 내 프로필 AI 도안 탭으로 이동
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
