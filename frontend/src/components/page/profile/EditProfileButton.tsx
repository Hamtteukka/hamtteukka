import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import EditProfileDialog from '@/components/page/profile/EditProfileDialog';

const EditProfileButton: React.FC = () => {
  const { isOpen, openModal } = useModal();

  return (
    <>
      <Button onClick={openModal} type='outlined'>
        프로필 수정
      </Button>
      {isOpen && <EditProfileDialog />}
    </>
  );
};

export default EditProfileButton;
