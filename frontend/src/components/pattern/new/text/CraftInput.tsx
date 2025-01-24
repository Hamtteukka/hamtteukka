import Dropdown from '@/components/ui/dropdown/Dropdown';
import { craftTypeListKr } from '@/lib/pattern';
import { TCraftTypeKr } from '@/types/pattern';

interface PCraftInput {
  craft?: TCraftTypeKr;
  setCraft: (value: TCraftTypeKr) => void;
}

const CraftInput: React.FC<PCraftInput> = ({ craft, setCraft }) => {
  return <Dropdown list={craftTypeListKr} value={craft} onClick={setCraft} placeholder='선택' />;
};

export default CraftInput;
