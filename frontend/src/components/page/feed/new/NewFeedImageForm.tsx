'use client';

import ImageInput from '@/components/ui/input/ImageInput';
import { useState } from 'react';

const NewFeedImageForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <div className='w-2/5 p-10'>
      <ImageInput file={file} setFile={setFile} description='최대 10mb 이하 jpeg, jpg, png' className='h-[28rem]' />
    </div>
  );
};

export default NewFeedImageForm;
