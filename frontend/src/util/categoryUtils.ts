import { CRAFT_KR, NEEDLE_KR } from '@/lib/constants/post';

export const categoryIdsToKr = (categoryIds: string): string[] => {
  const categoryIdArray: string[] = categoryIds.split(',');
  return categoryIdArray.map((id) => {
    if (Number(id) > 100) {
      return NEEDLE_KR[Number(id) as keyof typeof NEEDLE_KR];
    }

    return CRAFT_KR[Number(id) as keyof typeof CRAFT_KR];
  });
};
