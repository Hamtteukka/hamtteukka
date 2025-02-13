// import StoredPatternList from '@/components/page/archive/StoredPatternList';
// import StoredPostList from '@/components/page/archive/StoredPostList';
import SubscriptionList from '@/components/page/archive/SubscriptionList';
import ArchivePreviewList from '@/components/page/archive/ArchivePreviewList';

export const archiveTabs = ['구독 목록', '저장한 게시물', '저장한 AI 도안'] as const;
export const archiveTabPanels = [
  <SubscriptionList />,
  <ArchivePreviewList type='post' />,
  <ArchivePreviewList type='pattern' />,
] as const;
