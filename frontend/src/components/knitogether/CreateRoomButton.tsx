'use client';

import Button from '@/components/ui/button/Button';

const CreateRoomButton = () => {
  const handleButtonClick = () => {
    console.log('버튼 클릭');
  };

  return (
    <Button onClick={handleButtonClick}>
      <span className='text-body1 font-bold'>방 생성</span>
    </Button>
  );
};

export default CreateRoomButton;
