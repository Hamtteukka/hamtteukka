'use client';

import ImageInput from '@/components/ui/input/ImageInput';
import { useNewFeedContext } from '@/hooks/useNewFeedContext';
import { MAX_POST_IMAGE } from '@/lib/constants/post';
import { useEffect, useRef } from 'react';

const NewFeedImageForm: React.FC = () => {
  const {
    image: { files, count, addImage, removeImage },
  } = useNewFeedContext();

  const prevFileCountRef = useRef<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (count > prevFileCountRef.current && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }

    prevFileCountRef.current = count;
  }, [files]);

  return (
    <div
      ref={scrollContainerRef}
      className={`flex w-2/5 flex-col items-center gap-2.5 overflow-y-auto scroll-smooth p-10 ${count === 0 ? 'justify-center' : ''}`}
    >
      {files.map((file, index) => (
        <ImageInput
          key={index}
          file={file}
          setFile={() => removeImage(index)}
          description='최대 10mb 이하 jpeg, jpg, png'
          className='h-96 w-full shrink-0'
        />
      ))}
      {MAX_POST_IMAGE > count && (
        <ImageInput
          key={count}
          file={null}
          setFile={addImage}
          description='최대 10mb 이하 jpeg, jpg, png'
          className='h-96 w-full shrink-0'
        />
      )}
    </div>
  );
};

export default NewFeedImageForm;
