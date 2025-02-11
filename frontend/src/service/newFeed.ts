import { SUCCESS } from '@/lib/constants/service';
import { newFeed } from '@/service/api';

export const createFeed = async (formData: FormData): Promise<TFeedId> => {
  const { status, message, data } = await newFeed.createFeed(formData);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};
