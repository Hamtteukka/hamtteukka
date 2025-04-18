'use client';

import ImageInput from '@/components/ui/input/ImageInput';
import LabeledInput from '@/components/page/pattern/new/LabeledInput';
import Button from '@/components/ui/button/Button';
import TextInput from '@/components/ui/input/TextInput';
import { useState } from 'react';
import { signUp } from '@/service/auth';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/loginUser';

const SignUpForm: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [nickname, setNickname] = useState<string>();
  const { login } = useUserStore();
  const router = useRouter();

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async () => {
    if (!nickname || !image) {
      alert('프로필 이미지와 닉네임을 모두 입력해 주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('profileImage', image);

    try {
      const user = await signUp(formData);
      login(user);
      router.replace('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='flex flex-col gap-8'>
      <LabeledInput
        label='프로필 이미지'
        input={<ImageInput file={image} setFile={setImage} description='프로필 이미지를 등록해 주세요.' />}
      />
      <LabeledInput
        label='닉네임'
        input={<TextInput value={nickname} placeholder='닉네임' onChange={handleNicknameChange} className='w-80' />}
      />
      <Button onClick={handleSubmit} className='self-end'>
        완료
      </Button>
    </div>
  );
};

export default SignUpForm;
