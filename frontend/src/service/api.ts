import { TDotPattern, TTextPattern, TTextPatternInstruction } from '@/types/pattern';
import { TResponseData } from '@/types/service';

export const pattern = {
  generateTextPattern: async (body: TTextPatternInstruction): Promise<TResponseData<TTextPattern>> => {
    return fetch('/api/ai/description', {
      method: 'POST',
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
  generateDotPattern: async (formData: FormData): Promise<TResponseData<TDotPattern>> => {
    return fetch('/api/ai/dot', {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());
  },
};
