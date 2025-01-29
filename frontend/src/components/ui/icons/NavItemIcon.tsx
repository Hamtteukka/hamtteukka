'use client';

import { usePathname } from 'next/navigation';
import Home from '/public/svg/homeIcon.svg';
import FilledHome from '/public/svg/homeFilledIcon.svg';
import NewFeed from '/public/svg/plusIcon.svg';
import FilledNewFeed from '/public/svg/plusFilledIcon.svg';
import NewPattern from '/public/svg/aiIcon.svg';
import FilledNewPattern from '/public/svg/aiFilledIcon.svg';
import Knitogether from '/public/svg/videoConferenceIcon.svg';
import FilledKnitogether from '/public/svg/videoConferenceFilledIcon.svg';
import Archive from '/public/svg/archiveIcon.svg';
import FilledArchive from '/public/svg/archiveFilledIcon.svg';
import Profile from '/public/svg/profileIcon.svg';
import FilledProfile from '/public/svg/profileFilledIcon.svg';

interface PNavItemIcon {
  type: TNavIcon;
}

const NavItemIcon: React.FC<PNavItemIcon> = ({ type }) => {
  const pathname = usePathname();

  switch (type) {
    case 'home': {
      return pathname === '/' ? <FilledHome /> : <Home />;
    }
    case 'new-feed': {
      return pathname === '/feed/new' ? <FilledNewFeed /> : <NewFeed />;
    }
    case 'new-pattern': {
      return pathname.startsWith('/pattern/new') ? <FilledNewPattern /> : <NewPattern />;
    }
    case 'knitogether': {
      return pathname.startsWith('/knitogether') ? <FilledKnitogether /> : <Knitogether />;
    }
    case 'archive': {
      return pathname.startsWith('/archive') ? <FilledArchive /> : <Archive />;
    }
    case 'profile': {
      return pathname === '/profile/me' ? <FilledProfile /> : <Profile />;
    }
  }
};

export default NavItemIcon;
