'use client';

import { useState, useCallback } from 'react';
import { addFile, handleFile } from '@/util/fileHandler';
import Button from '@/components/ui/button/Button';
import ImgIcon from '/public/svg/imgIcon.svg';

interface PDragAndDropUploadImg {
  setImage: (file: File) => void;
  className?: string;
}

const DragAndDropUploadImg: React.FC<PDragAndDropUploadImg> = ({ className = '', setImage }) => {
  const [dragging, setDragging] = useState(false);

  const handleDragIn = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const files = e.dataTransfer.files;
        if (!files) return;
        handleFile(files, setImage);
        e.dataTransfer.clearData();
      }
    },
    [setImage],
  );

  return (
    <div
      className={`${className} ${dragging ? 'bg-black/5' : 'bg-inherit'} flex h-72 flex-col items-center justify-center gap-5 rounded-md border-2 border-dashed border-input`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ImgIcon />
      <p className='text-center font-bold text-placeholder'>AI가 참고할 이미지를 첨부해 주세요.</p>
      <Button className='border-input bg-gray text-white' onClick={() => addFile(true, setImage)}>
        이미지 가져오기
      </Button>
    </div>
  );
};

export default DragAndDropUploadImg;
