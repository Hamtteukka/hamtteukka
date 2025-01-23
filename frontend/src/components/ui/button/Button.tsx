import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PButton {
  children: ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'filled' | 'outlined' | 'primary-filled' | 'primary-outlined' | 'warning-filled' | 'warning-outlined';
  className?: string;
}

const Button: React.FC<PButton> = ({ children, onClick, type = 'filled', className = '' }) => {
  const { borderColor, bgColor, textColor } = buttonStyles[type];

  return (
    <button
      className={cn(
        `flex cursor-pointer justify-center rounded-sm border px-3 py-2 font-bold ${borderColor} ${bgColor} ${textColor} hover:opacity-90`,
        className,
      )}
      onClick={onClick}
      type='button'
    >
      {children}
    </button>
  );
};

const buttonStyles = {
  filled: { borderColor: 'border-primary-dark', bgColor: 'bg-primary-dark', textColor: 'text-white' },
  outlined: { borderColor: 'border-primary-dark', bgColor: 'bg-white', textColor: '' },
  'primary-filled': { borderColor: 'border-primary', bgColor: ' bg-primary', textColor: 'text-white' },
  'primary-outlined': { borderColor: 'border-primary', bgColor: 'bg-white', textColor: 'text-primary' },
  'warning-filled': { borderColor: 'border-warning', bgColor: 'bg-warning', textColor: 'text-white' },
  'warning-outlined': { borderColor: 'border-warning', bgColor: 'bg-white', textColor: 'text-warning' },
};

export default Button;
