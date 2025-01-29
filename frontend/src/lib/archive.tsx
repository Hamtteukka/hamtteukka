import StoredPatternList from '@/components/page/archive/StoredPatternList';
import StoredPostList from '@/components/page/archive/StoredPostList';
import SubscriptionList from '@/components/page/archive/SubscriptionList';

export const archiveTabs = ['구독 목록', '저장한 게시물', '저장한 AI 도안'] as const;
export const archiveTabPanels = [<SubscriptionList />, <StoredPostList />, <StoredPatternList />] as const;
