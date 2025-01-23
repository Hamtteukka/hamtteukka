const MIN_SIZE = 10;
const MAX_SIZE = 200;
const DEFAULT_SIZE = 50;
export const sizeNum = {
  min: MIN_SIZE,
  max: MAX_SIZE,
  default: DEFAULT_SIZE,
} as const;

const MIN_COLOR_NUM = 1;
const MAX_COLOR_NUM = 10;
const DEFAULT_COLOR_NUM = 3;
export const colorNum = {
  min: MIN_COLOR_NUM,
  max: MAX_COLOR_NUM,
  default: DEFAULT_COLOR_NUM,
} as const;
