import Slider from '@/components/ui/slider/Slider';

interface PControlledSlider {
  min: number;
  max: number;
  defaultValue: number;
  onChange: (value: number) => void;
  step?: number;
  className?: string;
}

const ControlledSlider: React.FC<PControlledSlider> = ({
  min,
  max,
  defaultValue,
  onChange,
  step = 1,
  className = '',
}) => {
  return (
    <Slider
      min={min}
      max={max}
      defaultValue={[defaultValue]}
      onValueChange={(value: number[]) => onChange(value[0])}
      step={step}
      className={className}
    />
  );
};

export default ControlledSlider;
