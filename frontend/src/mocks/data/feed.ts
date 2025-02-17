import { TFeedId, TFeedInfo } from '@/types/post';
import { MUser } from '@/mocks/data/user';

export const MFeedId: TFeedId = {
  feedId: 1,
};

export const MFeedInfo: TFeedInfo = {
  feedId: 1,
  title: '너무 귀여운 지구본 키링 🌎',
  content: `지구본을 참고하여 귀여운 지구본 키링을 떠봤습니다!
            실제 대륙의 위치와 똑같아요 ㅎㅎ

            사진 뒤로 넘기시면 첨부된 도안 사진 있습니다
            혹은 임베드된 도안 카드를 클릭하셔도 도안을 확인하실 수 있어요 ^-^

            🚨 도안 타인에게 공유 가능하나, 상업적 이용은 금지입니다`,
  images: ['/image/temp/short.png', '/image/temp/medium.png', '/image/temp/long.png', '/image/temp/long_long.png'],
  categoryIds: [101, 3],
  aiPattern: {
    feedId: 2,
    title: '지구본 키링 도안',
    thumbnailUrl: '/image/temp/short.png',
  },
  user: MUser,
  isScrap: false,
  owner: true,
};
