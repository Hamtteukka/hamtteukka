import { CRAFT_TYPE, NEEDLE_TYPE } from '@/lib/constants/pattern';

export const CRAFT_NUM = {
  [CRAFT_TYPE.TOP]: 1,
  [CRAFT_TYPE.BOTTOM]: 2,
  [CRAFT_TYPE.HAT]: 3,
  [CRAFT_TYPE.BAG]: 4,
  [CRAFT_TYPE.SCARF]: 5,
  [CRAFT_TYPE.WALLET]: 6,
  [CRAFT_TYPE.DOLL_CLOTHES]: 7,
  [CRAFT_TYPE.PET_ITEM]: 8,
  [CRAFT_TYPE.OTHER]: 0,
} as const;

export const NEEDLE_NUM = {
  [NEEDLE_TYPE.KNITTING]: 101,
  [NEEDLE_TYPE.CROCHETING]: 102,
} as const;

export const MAX_POST_IMAGE = 8;
