import Avatar from '@/components/ui/Avatar';
import CheckboxChecked from '/public/svg/checkboxCheckedIcon.svg';
import { useEmbedPatternContext } from '@/hooks/useEmbedPatternContext';
import { TFeedPreview } from '@/types/post';

interface PSelectablePostPreview {
  info: TFeedPreview;
}

const SelectablePostPreview: React.FC<PSelectablePostPreview> = ({ info: { feedId, thumbnail, title, profileId } }) => {
  const { selectedEmbedPattern, setSelectedEmbedPattern, setSelectedEmbedPatternImage } = useEmbedPatternContext();

  const select = () => {
    setSelectedEmbedPattern(feedId);
    setSelectedEmbedPatternImage(thumbnail);
  };

  return (
    <div className='relative flex grow cursor-pointer flex-col rounded-sm' onClick={select}>
      {feedId === selectedEmbedPattern && <CheckboxChecked className='absolute right-1 top-1 z-10' />}
      <img
        className={`min-h-24 w-full rounded-sm object-cover ${feedId === selectedEmbedPattern && 'opacity-60'}`}
        src={thumbnail}
        alt='썸네일'
      />
      <div className='flex items-center justify-between p-2'>
        <span className='text-detail'>{title}</span>
        <Avatar src={profileId} />
      </div>
    </div>
  );
};

export default SelectablePostPreview;
