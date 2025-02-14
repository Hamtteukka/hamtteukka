import { H4 } from '@/components/typography/Heading';
import ConfirmDialog from '@/components/ui/dialog/ConfirmDialog';
import AIPatternPreviewList from '@/components/page/feed/new/AIPatternPreviewList';
import { useNewFeedContext } from '@/hooks/useNewFeedContext';
import { useEmbedPatternContext } from '@/hooks/useEmbedPatternContext';
import { useModal } from '@/hooks/useModal';

const AIPatternEmbedDialog: React.FC = () => {
  const { selectedEmbedPattern, selectedEmbedPatternImage } = useEmbedPatternContext();

  const {
    content: { setEmbedPattern, setEmbedPatternImage },
  } = useNewFeedContext();

  const { closeModal } = useModal();

  const handleConfirmClick = () => {
    if (selectedEmbedPattern === -1) {
      alert('임베드할 도안을 선택해 주세요!');
      return;
    }
    setEmbedPattern(selectedEmbedPattern);
    setEmbedPatternImage(selectedEmbedPatternImage);
    closeModal();
  };

  return (
    <ConfirmDialog onConfirm={handleConfirmClick} confirmText='추가'>
      <div className='flex h-[32rem] w-[40rem] flex-col gap-4 overflow-y-auto px-4'>
        <H4>AI 도안 추가</H4>
        <AIPatternPreviewList />
      </div>
    </ConfirmDialog>
  );
};

export default AIPatternEmbedDialog;
