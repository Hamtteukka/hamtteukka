import { SUCCESS } from '@/lib/constants/service';
import { pattern } from '@/service/api';
import { TDotPattern } from '@/types/pattern';

export const generateDotPattern = async (formData: FormData): Promise<TDotPattern> => {
  const { status, message, data } = await pattern.generateDotPattern(formData);
  if (status !== SUCCESS) new Error(message);

  return data;
};
