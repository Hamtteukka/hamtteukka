import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';

interface PTextArea {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  minHeight: number;
  placeholder?: string;
  className?: string;
}

const TextArea: React.FC<PTextArea> = ({ value, onChange, minHeight, placeholder = '', className = '' }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = `${minHeight}px`;
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, minHeight)}px`;
    }
  };

  return (
    <textarea
      className={cn(
        'w-full resize-none overflow-hidden rounded-sm border border-input bg-white px-4 py-2.5 text-detail text-black placeholder:text-placeholder focus:outline-activative',
        className,
      )}
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default TextArea;
