import { useState } from 'react';

export const useImages = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [count, setCount] = useState<number>(0);

  const addImage = (newFile: File | null) => {
    if (newFile === null) return;
    setFiles((prevFiles) => [...prevFiles, newFile]);
    setCount((prevCount) => prevCount + 1);
  };

  const removeImage = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setCount((prevCount) => prevCount - 1);
  };

  return {
    files,
    count,
    addImage,
    removeImage,
  };
};
