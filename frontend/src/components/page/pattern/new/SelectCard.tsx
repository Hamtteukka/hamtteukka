import { patternOptions } from '@/lib/pattern';
import { H2 } from '@/components/typography/Heading';

interface PSelectCard {
  type: 'text' | 'dot';
}

const SelectCard: React.FC<PSelectCard> = ({ type }) => {
  return (
    <div className='flex h-[32rem] w-[30rem] flex-col items-center justify-center gap-2.5 rounded-md border bg-white'>
      <H2>{patternOptions[type].title}</H2>
      <p className='whitespace-pre text-center'>{patternOptions[type].description}</p>
    </div>
  );
};

export default SelectCard;
