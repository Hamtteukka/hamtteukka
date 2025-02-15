import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PBadge {
  children: ReactNode;
  type?: 'filled' | 'outlined' | 'primary-filled' | 'primary-outlined' | 'warning-filled' | 'warning-outlined';
  className?: string;
}

const Badge: React.FC<PBadge> = ({ children, type = 'filled', className = '' }) => {
  const { borderColor, bgColor, textColor } = badgeStyles[type];

  return (
    <div
      className={cn(
        `flex cursor-pointer justify-center rounded-full border px-3 py-1 font-bold ${borderColor} ${bgColor} ${textColor} hover:opacity-90`,
        className,
      )}
    >
      {children}
    </div>
  );
};

const badgeStyles = {
  filled: { borderColor: 'border-primary-dark', bgColor: 'bg-primary-dark', textColor: 'text-white' },
  outlined: { borderColor: 'border-primary-dark', bgColor: 'bg-white', textColor: '' },
  'primary-filled': { borderColor: 'border-primary', bgColor: ' bg-primary', textColor: 'text-white' },
  'primary-outlined': { borderColor: 'border-primary', bgColor: 'bg-white', textColor: 'text-primary' },
  'warning-filled': { borderColor: 'border-warning', bgColor: 'bg-warning', textColor: 'text-white' },
  'warning-outlined': { borderColor: 'border-warning', bgColor: 'bg-white', textColor: 'text-warning' },
};

export default Badge;
