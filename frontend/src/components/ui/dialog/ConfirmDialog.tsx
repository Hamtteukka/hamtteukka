import { useEffect } from 'react';
import Portal from '@/components/Portal';
import Button from '@/components/ui/button/Button';
import Close from '/public/svg/closeIcon.svg';
import { useModal } from '@/hooks/useModal';

interface PConfirmDialog {
  children: React.ReactNode;
  onConfirm: () => void;
  confirmText?: string;
}

const ConfirmDialog: React.FC<PConfirmDialog> = ({ children, onConfirm, confirmText = '확인' }) => {
  const { closeModal } = useModal();

  useEffect(() => {
    if (typeof window == 'undefined') return;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';

    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  return (
    <Portal>
      <div className='absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-modal'>
        <div className='flex flex-col items-center justify-center rounded-sm bg-white p-4 drop-shadow-md'>
          <div className='flex w-full justify-end' onClick={closeModal}>
            <Close className='cursor-pointer' />
          </div>
          <div>{children}</div>
          <div className='flex gap-3 pt-4'>
            <Button onClick={closeModal} type='outlined'>
              취소
            </Button>
            <Button onClick={onConfirm}>{confirmText}</Button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ConfirmDialog;
