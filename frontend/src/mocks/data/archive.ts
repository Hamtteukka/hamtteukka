import { TSubscriptionProfile } from '@/types/archive';

export const MSubscriptionList: Array<TSubscriptionProfile> = [
  {
    user: {
      userId: '1',
      nickname: '따뜻한 개구리',
      profileId: '',
    },
    subscriber: 8,
  },
  {
    user: {
      userId: '2',
      nickname: '따뜻한 개구리',
      profileId: '',
    },
    subscriber: 8,
  },
  {
    user: {
      userId: '3',
      nickname: '따뜻한 개구리',
      profileId: '',
    },
    subscriber: 8,
  },
  {
    user: {
      userId: '4',
      nickname: '따뜻한 개구리',
      profileId: '',
    },
    subscriber: 8,
  },
  {
    user: {
      userId: '5',
      nickname: '따뜻한 개구리',
      profileId: '',
    },
    subscriber: 8,
  },
  {
    user: {
      userId: '6',
      nickname: '따뜻한 개구리',
      profileId: '',
    },
    subscriber: 8,
  },
  {
    user: {
      userId: '7',
      nickname: '따뜻한 개구리',
      profileId: '',
    },
    subscriber: 8,
  },
  {
    user: {
      userId: '8',
      nickname: '따뜻한 개구리',
      profileId: '',
    },
    subscriber: 8,
  },
  {
    user: {
      userId: '9',
      nickname: '따뜻한 개구리',
      profileId: '',
    },
    subscriber: 8,
  },
  {
    user: {
      userId: '10',
      nickname: '따뜻한 개구리',
      profileId: '',
    },
    subscriber: 8,
  },
  {
    user: {
      userId: '11',
      nickname: '따뜻한 개구리',
      profileId: '',
    },
    subscriber: 8,
  },
  {
    user: {
      userId: '12',
      nickname: '따뜻한 개구리',
      profileId: '',
    },
    subscriber: 8,
  },
];

const imgArr = ['/image/temp/short.png', '/image/temp/medium.png', '/image/temp/long.png', '/image/temp/long_long.png'];

export const MStoredPostList: Array<TPostPreview> = Array.from({ length: 100 }, (_, index) => ({
  feedId: index,
  title: '제목 ' + index,
  thumbnail: imgArr[parseInt((Math.random() * 4).toString())],
  userProfile: '',
}));
