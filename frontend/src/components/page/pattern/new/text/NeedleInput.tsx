import Button from '@/components/ui/button/Button';
import { TNeedle } from '@/types/pattern';

interface PNeedle {
  needle: TNeedle;
  setNeedle: (value: TNeedle) => void;
}

const NeedleInput: React.FC<PNeedle> = ({ needle, setNeedle }) => {
  return (
    <div className='flex gap-2.5'>
      <Button type={needle === 'knitting' ? 'filled' : 'outlined'} onClick={() => setNeedle('knitting')}>
        대바늘
      </Button>
      <Button type={needle === 'crocheting' ? 'filled' : 'outlined'} onClick={() => setNeedle('crocheting')}>
        코바늘
      </Button>
    </div>
  );
};

export default NeedleInput;
