import LinkIcon from '/public/svg/linkIcon.svg';

interface PAIPatternEmbedCard {
  title: string;
  src: string;
}

const AIPatternEmbedCard: React.FC<PAIPatternEmbedCard> = ({ title, src }) => {
  return (
    <div className='flex max-w-80 flex-col gap-2.5 rounded-sm bg-primary p-4'>
      <div className='flex items-center gap-1'>
        <LinkIcon />
        <span className='font-bold'>{title}</span>
      </div>
      <img src={src} className='rounded-sm' />
    </div>
  );
};

export default AIPatternEmbedCard;
