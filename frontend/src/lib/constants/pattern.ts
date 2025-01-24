const MIN_SIZE = 10;
const MAX_SIZE = 200;
const DEFAULT_SIZE = 50;
export const SIZE_NUM = {
  MIN_SIZE,
  MAX_SIZE,
  DEFAULT_SIZE,
} as const;

const MIN_COLOR_NUM = 1;
const MAX_COLOR_NUM = 10;
const DEFAULT_COLOR_NUM = 3;
export const COLOR_NUM = {
  MIN_COLOR_NUM,
  MAX_COLOR_NUM,
  DEFAULT_COLOR_NUM,
} as const;

const KNITTING = 'knitting';
const CROCHETING = 'crocheting';
export const NEEDLE_TYPE = {
  knitting: KNITTING,
  crocheting: CROCHETING,
} as const;

const TOP = 'top';
const BOTTOM = 'bottom';
const HAT = 'hat';
const BAG = 'bag';
const SCARF = 'scarf';
const WALLET = 'wallet';
const DOLL_CLOTHES = 'dollClothes';
const PET_ITEM = 'petItem';
const OTHER = 'other';
export const CRAFT_TYPE = {
  TOP,
  BOTTOM,
  HAT,
  BAG,
  SCARF,
  WALLET,
  DOLL_CLOTHES,
  PET_ITEM,
  OTHER,
} as const;
