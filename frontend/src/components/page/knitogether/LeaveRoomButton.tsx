'use client';

import Button from '@/components/ui/button/Button';
import { leaveVideoRoom } from '@/service/openvidu';
import { useParams, useRouter } from 'next/navigation';

const LeaveRoomButton: React.FC = () => {
  const router = useRouter();
  const { sessionId } = useParams<{ sessionId: string }>();

  const handleButtonClick = async () => {
    await leaveVideoRoom(sessionId);
    router.push('/knitogether');
  };

  return (
    <Button type='warning-outlined' onClick={handleButtonClick}>
      <span className='text-body1'>나가기</span>
    </Button>
  );
};

export default LeaveRoomButton;
