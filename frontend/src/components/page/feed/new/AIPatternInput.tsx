import Image from 'next/image';
import AIPatternEmbedDialog from '@/components/page/feed/new/AIPatternEmbedDialog';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { useNewFeedContext } from '@/hooks/useNewFeedContext';
import TrashIcon from '/public/svg/trashIcon.svg';

const AIPatternInput: React.FC = () => {
  const { isOpen, openModal } = useModal();
  const {
    content: { embedPattern, embedPatternImage, setEmbedPattern, setEmbedPatternImage },
  } = useNewFeedContext();

  const clearEmbedPattern = () => {
    setEmbedPattern(-1);
    setEmbedPatternImage('');
  };

  return (
    <>
      {embedPattern && embedPatternImage ? (
        <div className='group relative inline-block cursor-pointer' onClick={clearEmbedPattern}>
          <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-modal opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
            <TrashIcon />
          </div>
          <Image width={500} height={500} src={embedPatternImage} alt='참고 이미지' />
        </div>
      ) : (
        <div className='flex h-40 w-64 flex-col items-center justify-center gap-2 rounded-sm border border-primary'>
          <Button onClick={openModal} type='primary-filled'>
            AI 도안 추가
          </Button>

          <div className='flex flex-col items-center text-detail text-primary'>
            <p>해당 작품과 연관된</p>
            <p>AI 도안을 임베드해 주세요!</p>
          </div>

          {isOpen && <AIPatternEmbedDialog />}
        </div>
      )}
    </>
  );
};

export default AIPatternInput;
