import ProfilePreviewList from '@/components/page/profile/ProfilePreviewList';

export const profileTabs = ['게시물', '생성한 AI 도안'] as const;
export const profileTabPanels = [
  <ProfilePreviewList type='userPost' />,
  <ProfilePreviewList type='userPattern' />,
] as const;
