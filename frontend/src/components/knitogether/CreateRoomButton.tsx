'use client';

import Button from '@/components/ui/button/Button';

const CreateRoomButton: React.FC = () => {
  const handleButtonClick = () => {
    console.log('버튼 클릭');
  };

  return (
    <Button onClick={handleButtonClick}>
      <span className='text-body1'>방 생성</span>
    </Button>
  );
};

export default CreateRoomButton;
