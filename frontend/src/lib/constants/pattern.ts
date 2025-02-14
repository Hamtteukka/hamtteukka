const SELECT = 0;
const TEXT = 1;
const DOT = 2;
const TEXT_RESULT = 3;
const DOT_RESULT = 4;
export const PATTERN_PAGE = {
  SELECT,
  TEXT,
  DOT,
  TEXT_RESULT,
  DOT_RESULT,
} as const;

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
  KNITTING,
  CROCHETING,
} as const;

const TOP = 'top';
const BOTTOM = 'bottom';
const HAT = 'hat';
const BAG = 'bag';
const SCARF = 'scarf';
const WALLET = 'wallet';
const KEYRING = 'keyring';
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
  KEYRING,
  DOLL_CLOTHES,
  PET_ITEM,
  OTHER,
} as const;

export const AI_GENERATION_TOTAL_COUNT = 3;
