import { TDotPattern } from '@/types/pattern';
import { TResponseData } from '@/types/service';

export const pattern = {
  generateDotPattern: async (formData: FormData): Promise<TResponseData<TDotPattern>> => {
    return fetch('/api/ai/dot', {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());
  },
};
