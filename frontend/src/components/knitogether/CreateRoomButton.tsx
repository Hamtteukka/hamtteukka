'use client';

import Button from '@/components/ui/button/Button';
import CreateRoomDialog from '@/components/knitogether/CreateRoomDialog';
import { useModal } from '@/hooks/useModal';

const CreateRoomButton: React.FC = () => {
  const { isOpen, openModal } = useModal();

  return (
    <div>
      <Button onClick={openModal}>
        <span className='text-body1'>방 생성</span>
      </Button>
      {isOpen && <CreateRoomDialog />}
    </div>
  );
};

export default CreateRoomButton;
