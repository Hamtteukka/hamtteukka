import NavItemIcon from '@/components/ui/icons/NavItemIcon';

export const navigationList: Array<TNavigation> = [
  {
    href: '/',
    title: '홈',
    icon: <NavItemIcon type='home' />,
  },
  {
    href: '/feed/new',
    title: '게시물 생성',
    icon: <NavItemIcon type='new-feed' />,
  },
  {
    href: '/pattern/new',
    title: '도안 생성',
    icon: <NavItemIcon type='new-pattern' />,
  },
  {
    href: '/knitogether',
    title: '모각뜨',
    icon: <NavItemIcon type='knitogether' />,
  },
  {
    href: '/archive',
    title: '아카이브',
    icon: <NavItemIcon type='archive' />,
  },
  {
    href: `/profile`,
    title: '내 프로필',
    icon: <NavItemIcon type='profile' />,
    flag: true,
  },
];
