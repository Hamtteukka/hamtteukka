import { TSubscriptionProfile } from '@/types/archive';
import { faker } from '@faker-js/faker';

export const MSubscriptionList: Array<TSubscriptionProfile> = [
  {
    userId: '1',
    nickname: '따뜻한 개구리',
    subscriber: 8,
    profileImage: '',
  },
  {
    userId: '2',
    nickname: '용감한 개구리',
    subscriber: 12,
    profileImage: '',
  },
  {
    userId: '3',
    nickname: '멍청한 개구리',
    subscriber: 1,
    profileImage: '',
  },
  {
    userId: '4',
    nickname: '필수적인 개구리',
    subscriber: 25,
    profileImage: '',
  },
  {
    userId: '5',
    nickname: '따뜻한 개구리',
    subscriber: 8,
    profileImage: '',
  },
  {
    userId: '6',
    nickname: '용감한 개구리',
    subscriber: 12,
    profileImage: '',
  },
  {
    userId: '7',
    nickname: '멍청한 개구리',
    subscriber: 1,
    profileImage: '',
  },
  {
    userId: '8',
    nickname: '필수적인 개구리',
    subscriber: 25,
    profileImage: '',
  },
  {
    userId: '9',
    nickname: '따뜻한 개구리',
    subscriber: 8,
    profileImage: '',
  },
  {
    userId: '10',
    nickname: '용감한 개구리',
    subscriber: 12,
    profileImage: '',
  },
  {
    userId: '11',
    nickname: '멍청한 개구리',
    subscriber: 1,
    profileImage: '',
  },
  {
    userId: '12',
    nickname: '필수적인 개구리',
    subscriber: 25,
    profileImage: '',
  },
];

const imgArr = ['/image/kakao.png', '/image/profile.png', '/image/video_preview.png', '/logo/logo.png'];

export const MStoredPostList: Array<TPostPreview> = Array.from({ length: 100 }, (_, index) => ({
  feedId: index,
  title: '제목 ' + index,
  thumbnail: imgArr[parseInt((Math.random() * 4).toString())],
  userProfile: '',
}));
