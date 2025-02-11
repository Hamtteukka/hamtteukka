'use client';

import { useImages } from '@/hooks/useImages';
import useTextInput from '@/hooks/useTextInput';
import { NEEDLE_TYPE } from '@/lib/constants/pattern';
import { TCraftTypeKr, TNeedle } from '@/types/pattern';
import React, { ChangeEvent, createContext, Dispatch, SetStateAction, useState } from 'react';

interface PNewFeedContext {
  image: {
    files: File[];
    count: number;
    addImage: (newFile: File | null) => void;
    removeImage: (index: number) => void;
  };
  content: {
    needle: TNeedle;
    craft: TCraftTypeKr | undefined;
    title: string;
    detail: string;
    setNeedle: Dispatch<SetStateAction<TNeedle>>;
    setCraft: Dispatch<SetStateAction<TCraftTypeKr | undefined>>;
    setTitle: (e: ChangeEvent<HTMLInputElement>) => void;
    setDetail: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  };
}

export const NewFeedContext = createContext<PNewFeedContext | undefined>(undefined);

export const NewFeedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [needle, setNeedle] = useState<TNeedle>(NEEDLE_TYPE.KNITTING);
  const [craft, setCraft] = useState<TCraftTypeKr>();
  const [title, setTitle] = useTextInput<HTMLInputElement>('');
  const [detail, setDetail] = useTextInput<HTMLTextAreaElement>('');

  const { files, count, addImage, removeImage } = useImages();

  const contextValue: PNewFeedContext = {
    image: {
      files,
      count,
      addImage,
      removeImage,
    },
    content: {
      needle,
      craft,
      title,
      detail,
      setNeedle,
      setCraft,
      setTitle,
      setDetail,
    },
  };

  return <NewFeedContext.Provider value={contextValue}>{children}</NewFeedContext.Provider>;
};
