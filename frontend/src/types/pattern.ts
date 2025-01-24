import { CRAFT_TYPE, NEEDLE_TYPE } from '@/lib/constants/pattern';
import { craftTypeKrToEn } from '@/lib/pattern';

export type TPattern = 'select' | 'text' | 'dot';

export type TNeedle = (typeof NEEDLE_TYPE)[keyof typeof NEEDLE_TYPE];
export type TCraftType = (typeof CRAFT_TYPE)[keyof typeof CRAFT_TYPE];
export type TCraftTypeKr = keyof typeof craftTypeKrToEn;
