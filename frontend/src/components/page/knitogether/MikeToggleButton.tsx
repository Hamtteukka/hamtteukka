'use client';

import Button from '@/components/ui/button/Button';

interface PMikeToggleButton {
  isOn: boolean;
  onClick: () => void;
}

const MikeToggleButton: React.FC<PMikeToggleButton> = ({ isOn, onClick }) => {
  return (
    <Button type={isOn ? 'outlined' : 'filled'} onClick={onClick}>
      <span className='font-bold'>{isOn ? '마이크 끄기' : '마이크 켜기'}</span>
    </Button>
  );
};

export default MikeToggleButton;
