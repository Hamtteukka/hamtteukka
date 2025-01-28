'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import TrashIcon from '/public/svg/trashIcon.svg';

const DragAndDropUploadImg = dynamic(() => import('@/components/ui/dragAndDropUpload/DragAndDropUpload'), {
  ssr: false,
});

interface PImageInput {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  description?: string;
  className?: string;
}

const ImageInput: React.FC<PImageInput> = ({ file, setFile, description = '', className = '' }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      if (previewUrl) {
        setPreviewUrl(null);
      }
    }
  }, [file]);

  const handleFile = (file: File) => {
    setFile(file);
  };

  return previewUrl ? (
    <div className='group relative inline-block cursor-pointer' onClick={() => setFile(null)}>
      <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-modal opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
        <TrashIcon />
      </div>
      <Image className='hover:bg-modal' width={500} height={500} src={previewUrl} alt='참고 이미지' />
    </div>
  ) : (
    <DragAndDropUploadImg setImage={handleFile} description={description} className={className} />
  );
};

export default ImageInput;
