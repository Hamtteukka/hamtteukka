export const isNaturalNumber = (input: string | number, includeZero: boolean): boolean => {
  const num = typeof input === 'string' ? Number(input) : input;
  return Number.isInteger(num) && (includeZero ? num >= 0 : num > 0);
};
