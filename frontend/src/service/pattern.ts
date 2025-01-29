import { SUCCESS } from '@/lib/constants/service';
import { pattern } from '@/service/api';
import { TDotPattern, TTextPattern, TTextPatternInstruction } from '@/types/pattern';

export const generateTextPattern = async (body: TTextPatternInstruction): Promise<TTextPattern> => {
  const { status, message, data } = await pattern.generateTextPattern(body);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};

export const generateDotPattern = async (formData: FormData): Promise<TDotPattern> => {
  const { status, message, data } = await pattern.generateDotPattern(formData);
  if (status !== SUCCESS) throw new Error(message);

  return data;
};
