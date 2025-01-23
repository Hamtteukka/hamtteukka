import ControlledSlider from '@/components/ui/slider/ControlledSlider';
import { colorNum } from '@/lib/constants/pattern';

const TEXT_CLASS = 'font-bold text-deepgray text-detail ';

interface PColorNumInput {
  num: number;
  setNum: (value: number) => void;
}

const ColorNumInput: React.FC<PColorNumInput> = ({ num, setNum }) => {
  return (
    <div className='flex flex-col gap-2.5'>
      <label className={'flex flex-col gap-1 ' + TEXT_CLASS}>
        가로
        <ControlledSlider min={colorNum.min} max={colorNum.max} defaultValue={colorNum.default} onChange={setNum} />
      </label>
      <span className={'self-end ' + TEXT_CLASS}>{num}개</span>
    </div>
  );
};

export default ColorNumInput;
