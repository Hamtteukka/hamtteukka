export const patternOptions = {
  text: {
    title: '서술형 도안',
    description:
      '사용할 바늘 종류, 만들고 싶은 작품 종류,\n원하는 패턴 및 색상을 입력해서\n서술형 도안과 예상 이미지를 생성해요.',
  },
  dot: {
    title: '도트 도안',
    description: 'AI가 참고할 이미지를 첨부해서\n도트 도안을 생성해요.',
  },
} as const;

export const patternInput = {
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
