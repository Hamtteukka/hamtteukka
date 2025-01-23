'use client';

import Button from '@/components/ui/button/Button';
import { useState } from 'react';

const CameraToggleButton: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  const handleButtonClick = () => {
    setIsOn((isOn) => !isOn);
  };

  return (
    <Button type={isOn ? 'outlined' : 'filled'} onClick={handleButtonClick}>
      <span className='font-bold'>{isOn ? '카메라 끄기' : '카메라 켜기'}</span>
    </Button>
  );
};

export default CameraToggleButton;
