'use client';

import Button from '@/components/ui/button/Button';
import { useRouter } from 'next/navigation';

const LeaveRoomButton: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/knitogether');
  };

  return (
    <Button type='warning-outlined' onClick={handleButtonClick}>
      <span className='text-body1'>나가기</span>
    </Button>
  );
};

export default LeaveRoomButton;
