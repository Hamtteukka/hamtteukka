import { useState } from 'react';
import { H4 } from '@/components/typography/Heading';
import TextInput from '@/components/ui/input/TextInput';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import ConfirmDialog from '@/components/ui/dialog/ConfirmDialog';
import ImageInput from '@/components/ui/input/ImageInput';
import { MAX_ROOM_USERS } from '@/lib/constants/knitogether';

const CreateRoomDialog: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>();
  const [maxUsers, setMaxUsers] = useState<string>();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // TODO: 방 생성 API 호출
  const handleConfirmClick = () => {};

  return (
    <ConfirmDialog onConfirm={handleConfirmClick} confirmText='생성'>
      <div className='flex w-80 flex-col gap-4 px-4'>
        <H4>방 생성</H4>
        <ImageInput
          file={image}
          setFile={setImage}
          description='방의 미리보기 이미지를 등록해 주세요!'
          className='h-60'
        />
        <TextInput value={title} placeholder='방 제목' onChange={handleTitleChange} />
        <Dropdown
          value={maxUsers}
          list={Array.from({ length: MAX_ROOM_USERS }, (_, index) => (index + 1).toString())}
          onClick={setMaxUsers}
          placeholder='최대 인원 선택'
        />
      </div>
    </ConfirmDialog>
  );
};

export default CreateRoomDialog;
