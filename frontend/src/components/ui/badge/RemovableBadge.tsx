import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import CancelIcon from '/public/svg/cancelIcon.svg';

interface PRemovableBadge {
  children: ReactNode;
  onRemove: () => void;
  className?: string;
}

const RemovableBadge: React.FC<PRemovableBadge> = ({ children, onRemove, className = '' }) => {
  return (
    <div
      className={cn(
        `flex items-center justify-center gap-1 rounded-sm border border-primary-dark bg-primary-dark px-3 py-2 font-bold text-white`,
        className,
      )}
    >
      {children}
      <CancelIcon className='cursor-pointer' onClick={onRemove} />
    </div>
  );
};

export default RemovableBadge;
