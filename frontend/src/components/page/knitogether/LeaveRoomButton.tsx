'use client';

import Button from '@/components/ui/button/Button';

const LeaveRoomButton: React.FC = () => {
  const handleButtonClick = () => {
    console.log('버튼 클릭');
  };

  return (
    <Button type='warning-outlined' onClick={handleButtonClick}>
      <span className='text-body1'>나가기</span>
    </Button>
  );
};

export default LeaveRoomButton;
