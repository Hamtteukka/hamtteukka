import { cn } from '@/lib/utils';

interface PTextInput {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const TextInput: React.FC<PTextInput> = ({
  value,
  onChange,
  placeholder = '',
  className = '',
  id,
  disabled = false,
}) => {
  return (
    <input
      className={cn(
        'focus:outline-activate w-full resize-none overflow-hidden rounded-sm border border-input bg-white px-4 py-2.5 text-detail text-black placeholder:text-placeholder',
        className,
      )}
      id={id}
      value={value}
      onChange={onChange}
      type='text'
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default TextInput;
