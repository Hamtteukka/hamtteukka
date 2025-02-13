'use client';

import Button from '@/components/ui/button/Button';

interface PCameraToggleButton {
  isOn: boolean;
  onClick: () => void;
}

const CameraToggleButton: React.FC<PCameraToggleButton> = ({ isOn, onClick }) => {
  return (
    <Button type={isOn ? 'outlined' : 'filled'} onClick={onClick}>
      <span className='font-bold'>{isOn ? '카메라 끄기' : '카메라 켜기'}</span>
    </Button>
  );
};

export default CameraToggleButton;
