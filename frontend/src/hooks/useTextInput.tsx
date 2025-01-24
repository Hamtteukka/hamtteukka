import { useState } from 'react';

const useTextInput = <T extends HTMLInputElement | HTMLTextAreaElement>(initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = (e: React.ChangeEvent<T>) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return [value, onChange, reset] as const;
};

export default useTextInput;
