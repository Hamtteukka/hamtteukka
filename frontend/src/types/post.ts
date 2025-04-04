import { TUser } from '@/types/user';

export interface TFeedId {
  feedId: number;
}

export interface TFeedPreview extends TFeedId {
  thumbnail: string;
  title: string;
  profileId: string;
}

export interface TAIFeed extends TFeedId {
  title: string;
  thumbnail: string;
}

export interface TScrap {
  isScrap: boolean;
}

export interface TFeedInfo extends TFeedId {
  title: string;
  content: string;
  images: string[];
  categoryIds: number[];
  aiPattern: TAIFeed;
  user: TUser;
  isScrap: boolean;
  owner: boolean;
}
