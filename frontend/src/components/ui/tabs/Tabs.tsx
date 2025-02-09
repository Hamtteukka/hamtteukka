'use client';

import { useUriFragment } from '@/hooks/useUriFragment';
import { isNaturalNumber } from '@/util/number';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import React, { Fragment, useEffect } from 'react';

interface PTabs {
  tabList: readonly string[];
  tabPanels: readonly React.ReactNode[];
}

const Tabs: React.FC<PTabs> = ({ tabList, tabPanels }) => {
  const [_, handleHashUrl] = useUriFragment('0');

  const hash = window.location.hash.split('#')[1];
  const defaultIndex = isNaturalNumber(hash, true) && Number(hash) < tabList.length ? Number(hash) : 0;

  useEffect(() => {
    if (!isNaturalNumber(hash, true)) {
      handleHashUrl(0);
    }
  }, [hash, handleHashUrl]);

  return (
    <TabGroup defaultIndex={defaultIndex} onChange={handleHashUrl}>
      <TabList className='flex py-6'>
        {tabList.map((item) => (
          <Tab key={item} as={Fragment}>
            {({ selected }) => (
              <button
                className={clsx(
                  'relative mb-2 grow text-heading3 font-bold after:absolute after:-bottom-1 after:left-1/2 after:h-1 after:w-12 after:-translate-x-1/2 after:content-[""] focus:outline-none active:outline-none',
                  selected && 'after:bg-primary',
                )}
              >
                {item}
              </button>
            )}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabPanels.map((children, idx) => (
          <TabPanel key={idx}>{children}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default Tabs;
