'use client';

import Button from '@/components/ui/button/Button';
import { useState } from 'react';

const MikeToggleButton: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  const handleButtonClick = () => {
    setIsOn((isOn) => !isOn);
  };

  return (
    <Button type={isOn ? 'outlined' : 'filled'} onClick={handleButtonClick}>
      <span className='font-bold'>{isOn ? '마이크 끄기' : '마이크 켜기'}</span>
    </Button>
  );
};

export default MikeToggleButton;
