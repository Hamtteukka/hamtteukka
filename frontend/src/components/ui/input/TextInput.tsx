import { cn } from '@/lib/utils';
import { FocusEventHandler } from 'react';

interface PTextInput {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const TextInput: React.FC<PTextInput> = ({
  value,
  onChange,
  onFocus = () => {},
  placeholder = '',
  className = '',
  id,
  disabled = false,
}) => {
  return (
    <input
      className={cn(
        'w-full resize-none overflow-hidden rounded-sm border border-input bg-white px-4 py-2.5 text-detail text-black placeholder:text-placeholder focus:outline-activate',
        className,
      )}
      id={id}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      type='text'
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default TextInput;
