import { craftList, patternInput } from '@/lib/pattern';
import NeedleInput from '@/components/page/pattern/new/text/NeedleInput';
import LabeledInput from '@/components/page/pattern/new/LabeledInput';
import RemovableBadge from '@/components/ui/badge/RemovableBadge';
import CheckboxButton from '@/components/ui/checkbox/CheckboxButton';
import { useSearchContext } from '@/hooks/useSearchContext';

const SearchDropdown: React.FC = () => {
  const { needle, crafts, setNeedle, addCraft, removeCraft } = useSearchContext();

  const removeNeedle = () => {
    setNeedle(undefined);
  };

  return (
    <div className='absolute top-16 z-10 w-full divide-y-2 rounded-sm border border-input bg-white'>
      <div className='flex gap-2.5 p-4'>
        {needle && (
          <RemovableBadge onRemove={removeNeedle}>{needle === 'knitting' ? '대바늘' : '코바늘'}</RemovableBadge>
        )}
        {crafts.map((craft) => (
          <RemovableBadge onRemove={() => removeCraft(craft)}>{craft}</RemovableBadge>
        ))}
      </div>
      <div>
        <div className='p-4'>
          <LabeledInput
            label={patternInput.needle.label}
            input={<NeedleInput needle={needle} setNeedle={setNeedle} />}
            vertical={true}
          />
        </div>
        <div className='p-4'>
          <LabeledInput
            label={patternInput.craftType.label}
            input={<CheckboxButton list={craftList} values={crafts} onClick={addCraft} />}
            vertical={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchDropdown;
