import { archiveTabPanels, archiveTabs } from '@/lib/archive';
import dynamic from 'next/dynamic';

const Tabs = dynamic(() => import('@/components/ui/tabs/Tabs'), { ssr: false });

const Archive: React.FC = () => {
  return <Tabs tabList={archiveTabs} tabPanels={archiveTabPanels} />;
};

export default Archive;
