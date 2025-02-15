import { H4 } from '@/components/typography/Heading';
import ConfirmDialog from '@/components/ui/dialog/ConfirmDialog';
import ImageInput from '@/components/ui/input/ImageInput';
import TextInput from '@/components/ui/input/TextInput';
import { useModal } from '@/hooks/useModal';
import useTextInput from '@/hooks/useTextInput';
import { editUserInfo } from '@/service/profile';
import { useUserStore } from '@/store/loginUser';
import { useEffect, useState } from 'react';

const EditProfileDialog: React.FC = () => {
  const { nickname, profileId, edit } = useUserStore();

  const [newImage, setNewImage] = useState<string | File | null>(null);
  const [newNickname, onChange] = useTextInput(nickname);

  const { closeModal } = useModal();

  useEffect(() => {
    setNewImage(profileId);
  }, []);

  const editProfile = async () => {
    if (nickname === newNickname && profileId === newImage) {
      closeModal();
      return;
    }

    if (!newNickname || !newImage) {
      alert('이미지 혹은 닉네임을 입력해 주세요!');
      return;
    }
    const formData = new FormData();

    formData.append('nickname', newNickname);
    formData.append('profileId', newImage);

    try {
      const newUserInfo = await editUserInfo(formData);
      edit(newUserInfo);
      closeModal();
      window.location.reload();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <ConfirmDialog onConfirm={editProfile} confirmText='수정'>
      <div className='flex w-80 flex-col gap-4'>
        <H4>프로필 수정</H4>
        <ImageInput file={newImage} setFile={setNewImage} description='프로필 이미지를 등록해 주세요.' />
        <TextInput value={newNickname} onChange={onChange} />
      </div>
    </ConfirmDialog>
  );
};

export default EditProfileDialog;
