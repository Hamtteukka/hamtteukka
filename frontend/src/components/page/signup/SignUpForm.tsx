'use client';

import ImageInput from '@/components/page/pattern/new/dot/ImageInput';
import LabeledInput from '@/components/page/pattern/new/LabeledInput';
import Button from '@/components/ui/button/Button';
import TextInput from '@/components/ui/input/TextInput';
import { useState } from 'react';

const SignUpForm: React.FC = () => {
  const [image, setImage] = useState<File>();
  const [nickname, setNickname] = useState<string>();

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <div className='flex flex-col gap-8'>
      <LabeledInput label='프로필 이미지' input={<ImageInput description='프로필 이미지를 등록해 주세요.' />} />
      <LabeledInput
        label='닉네임'
        input={<TextInput value={nickname} placeholder='닉네임' onChange={handleNicknameChange} className='w-80' />}
      />
      <Button onClick={() => {}} className='self-end'>
        완료
      </Button>
    </div>
  );
};

export default SignUpForm;
