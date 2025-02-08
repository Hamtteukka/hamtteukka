import { patternOptions } from '@/lib/pattern';
import { H2 } from '@/components/typography/Heading';
import { TPattern } from '@/types/pattern';
import { PATTERN_PAGE } from '@/lib/constants/pattern';
import Image from 'next/image';

interface PSelectCard {
  type: Extract<TPattern, typeof PATTERN_PAGE.TEXT | typeof PATTERN_PAGE.DOT>;
}

const SelectCard: React.FC<PSelectCard> = ({ type }) => {
  return (
    <div className='flex h-[32rem] w-[30rem] flex-col items-center justify-center gap-2.5 rounded-md border bg-white hover:border-primary-light'>
      <H2>{patternOptions[type].title}</H2>
      <p className='whitespace-pre text-center'>{patternOptions[type].description}</p>
      <Image width={256} src={patternOptions[type].image} alt='도트 도안 참고 이미지' className='m-4' />
    </div>
  );
};

export default SelectCard;
