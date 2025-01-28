import { TTextPattern } from '@/types/pattern';

export const base64img =
  'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

export const textPattern: TTextPattern = {
  description: '서술형 도안\n서술형 도안\n서술형 도안',
  expectedImage: base64img,
};
