import AIPatternEmbedDialog from '@/components/page/feed/new/AIPatternEmbedDialog';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';

const AIPatternInput: React.FC = () => {
  const { isOpen, openModal } = useModal();

  return (
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
  );
};

export default AIPatternInput;
