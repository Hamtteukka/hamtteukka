import { CRAFT_TYPE, NEEDLE_TYPE, PATTERN_PAGE } from '@/lib/constants/pattern';
import { TCraftTypeKr, TNeedleTypeKr } from '@/types/pattern';
import dotImage from '/public/image/dot.png';
import textImage from '/public/image/text.png';

export const patternOptions = {
  [PATTERN_PAGE.TEXT]: {
    title: '서술형 도안',
    description:
      '사용할 바늘 종류, 만들고 싶은 작품 종류,\n원하는 패턴 및 색상을 입력해서\n서술형 도안과 예상 결과 이미지를 생성해요.',
    image: textImage,
  },
  [PATTERN_PAGE.DOT]: {
    title: '도트 도안',
    description: 'AI가 참고할 이미지를 첨부해서\n도트 도안을 생성해요.',
    image: dotImage,
  },
} as const;

export const patternInput = {
  needle: {
    label: '바늘 종류',
  },
  craftType: {
    label: '작품 종류',
  },
  detail: {
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

export const needleList: TNeedleTypeKr[] = ['대바늘', '코바늘'] as const;
export const craftList: TCraftTypeKr[] = [
  '상의',
  '하의',
  '모자',
  '가방',
  '목도리',
  '지갑',
  '키링',
  '인형옷',
  '반려동물',
  '기타',
] as const;

export const craftTypeKrToEn = {
  상의: CRAFT_TYPE.TOP,
  하의: CRAFT_TYPE.BOTTOM,
  모자: CRAFT_TYPE.HAT,
  가방: CRAFT_TYPE.BAG,
  목도리: CRAFT_TYPE.SCARF,
  지갑: CRAFT_TYPE.WALLET,
  키링: CRAFT_TYPE.KEYRING,
  인형옷: CRAFT_TYPE.DOLL_CLOTHES,
  반려동물: CRAFT_TYPE.PET_ITEM,
  기타: CRAFT_TYPE.OTHER,
} as const;

export const needleTypeKrToEn = {
  대바늘: NEEDLE_TYPE.KNITTING,
  코바늘: NEEDLE_TYPE.CROCHETING,
} as const;

export const craftTypeListKr = Object.keys(craftTypeKrToEn) as TCraftTypeKr[];
