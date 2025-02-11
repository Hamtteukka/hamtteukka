import { H4 } from '@/components/typography/Heading';
import ConfirmDialog from '@/components/ui/dialog/ConfirmDialog';
import PreviewList from '@/components/page/archive/PreviewList';

const AIPatternEmbedDialog: React.FC = () => {
  return (
    <ConfirmDialog onConfirm={() => {}} confirmText='추가'>
      <div className='flex h-[32rem] w-[40rem] flex-col gap-4 overflow-y-auto px-4'>
        <H4>AI 도안 추가</H4>
        <PreviewList type='pattern' />
      </div>
    </ConfirmDialog>
  );
};

export default AIPatternEmbedDialog;
