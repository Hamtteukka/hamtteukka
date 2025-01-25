import ControlledSlider from '@/components/ui/slider/ControlledSlider';
import { SIZE_NUM } from '@/lib/constants/pattern';

const TEXT_CLASS = 'font-bold text-deepgray text-detail ';

interface PSizeInput {
  width: number;
  height: number;
  setWidth: (value: number) => void;
  setHeight: (value: number) => void;
}

const SizeInput: React.FC<PSizeInput> = ({ width, height, setWidth, setHeight }) => {
  return (
    <div className='flex flex-col gap-2.5'>
      <label className={'flex flex-col gap-1 ' + TEXT_CLASS}>
        가로
        <ControlledSlider
          min={SIZE_NUM.MIN_SIZE}
          max={SIZE_NUM.MAX_SIZE}
          defaultValue={SIZE_NUM.DEFAULT_SIZE}
          onChange={setWidth}
        />
      </label>
      <label className={'flex flex-col gap-1 ' + TEXT_CLASS}>
        세로
        <ControlledSlider
          min={SIZE_NUM.MIN_SIZE}
          max={SIZE_NUM.MAX_SIZE}
          defaultValue={SIZE_NUM.DEFAULT_SIZE}
          onChange={setHeight}
        />
      </label>
      <span className={'self-end ' + TEXT_CLASS}>
        {width}(가로) x {height}(세로)
      </span>
    </div>
  );
};

export default SizeInput;
