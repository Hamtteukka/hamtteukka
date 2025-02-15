import { useState } from 'react';

export const useCheckboxButton = <T extends string>() => {
  const [values, setValues] = useState<T[]>([]);

  const addValue = (value: T) => {
    if (values.includes(value)) return;
    setValues((prev) => [...prev, value]);
  };

  const removeValue = (value: T) => {
    setValues((prev) => prev.filter((item) => item !== value));
  };

  return { values, addValue, removeValue };
};
