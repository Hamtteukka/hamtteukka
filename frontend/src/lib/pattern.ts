import { CRAFT_TYPE, PATTERN_PAGE } from '@/lib/constants/pattern';
import { TCraftTypeKr } from '@/types/pattern';

export const patternOptions = {
  [PATTERN_PAGE.TEXT]: {
    title: '서술형 도안',
    description:
      '사용할 바늘 종류, 만들고 싶은 작품 종류,\n원하는 패턴 및 색상을 입력해서\n서술형 도안과 예상 이미지를 생성해요.',
  },
  [PATTERN_PAGE.DOT]: {
    title: '도트 도안',
    description: 'AI가 참고할 이미지를 첨부해서\n도트 도안을 생성해요.',
  },
} as const;

export const patternInput = {
  needle: {
    label: '바늘 종류',
  },
  craftType: {
    label: '작품 종류',
  },
  details: {
    label: '상세 설명',
    help: '모양, 패턴, 크기 등 만들고 싶은 작품에 대해 자유롭게 설명해 주세요.',
  },
  size: {
    label: '규격',
    help: '규격은 가로 x 세로의 도트 개수를 나타내요. 이를 토대로 생성될 도안의 전체 크기가 정해져요.',
  },
  color: {
    label: '색상',
    help: '색상 수는 도트 도안에서 사용할 색상의 개수를 나타내요. AI가 최대한 비슷한 색들을 뽑아내요.',
  },
  image: {
    label: '참고 이미지',
    help: '업로드한 이미지를 참고해서 AI가 이미지와 비슷한 모양의 도트 도안을 만들어줘요.',
  },
};

export const craftTypeKrToEn = {
  상의: CRAFT_TYPE.TOP,
  하의: CRAFT_TYPE.BOTTOM,
  모자: CRAFT_TYPE.HAT,
  가방: CRAFT_TYPE.BAG,
  목도리: CRAFT_TYPE.SCARF,
  지갑: CRAFT_TYPE.WALLET,
  인형옷: CRAFT_TYPE.DOLL_CLOTHES,
  반려동물: CRAFT_TYPE.PET_ITEM,
  기타: CRAFT_TYPE.OTHER,
} as const;

export const craftTypeListKr = Object.keys(craftTypeKrToEn) as TCraftTypeKr[];
