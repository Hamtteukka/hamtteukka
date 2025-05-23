import { CRAFT_TYPE, NEEDLE_TYPE, PATTERN_PAGE } from '@/lib/constants/pattern';
import { craftTypeKrToEn, needleTypeKrToEn } from '@/lib/pattern';

export type TPattern = (typeof PATTERN_PAGE)[keyof typeof PATTERN_PAGE];

export type TNeedle = (typeof NEEDLE_TYPE)[keyof typeof NEEDLE_TYPE];
export type TNeedleTypeKr = keyof typeof needleTypeKrToEn;
export type TCraftType = (typeof CRAFT_TYPE)[keyof typeof CRAFT_TYPE];
export type TCraftTypeKr = keyof typeof craftTypeKrToEn;

export interface TTextPatternInstruction {
  needle: string;
  work: string;
  detail: string;
}

export interface TTextPattern {
  description: string;
  expectedImage: string;
}
export interface TDotPattern {
  dotImage: string;
}

export interface TPatternPost {
  base64Image: string;
  title: string;
  content: string;
  categoryIds?: number[];
}
