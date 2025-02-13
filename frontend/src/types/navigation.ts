type TNavIcon = 'home' | 'new-feed' | 'new-pattern' | 'knitogether' | 'archive' | 'profile';

interface TNavigation {
  href: string;
  title: string;
  icon: React.ReactElement;
  flag?: boolean;
}
