import Link from 'next/link';

interface PNavItem extends TNavigation {}

const NavItem: React.FC<PNavItem> = ({ href, title, icon }) => {
  return (
    <Link className='flex items-center gap-2.5 p-4' href={href}>
      {icon}
      <span className='text-body2 font-bold'>{title}</span>
    </Link>
  );
};

export default NavItem;
