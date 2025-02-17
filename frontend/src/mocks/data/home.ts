import { TFeedPreview } from '@/types/post';

const imgArr = ['/image/temp/short.png', '/image/temp/medium.png', '/image/temp/long.png', '/image/temp/long_long.png'];

export const MPostList: Array<TFeedPreview> = Array.from({ length: 500 }, (_, index) => ({
  feedId: index,
  title: '제목 ' + index,
  thumbnail: imgArr[parseInt((Math.random() * 4).toString())],
  profileId: '',
}));
