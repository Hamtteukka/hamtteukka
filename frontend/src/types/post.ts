interface TFeedId {
  feedId: number;
}

interface TFeedPreview extends TFeedId {
  thumbnail: string;
  title: string;
  userProfile: string;
}
