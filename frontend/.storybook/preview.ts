import type { Preview } from '@storybook/react';
import '@/app/globals.css';
import { ReadonlyURLSearchParams, getRouter, usePathname, useSearchParams } from '@storybook/nextjs/navigation.mock';
import { useMemo } from 'react';
import mockRouter from 'next-router-mock';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  beforeEach: () => {
    getRouter().push.mockImplementation((...args: Parameters<typeof mockRouter.push>) => mockRouter.push(...args));
    getRouter().replace.mockImplementation((...args: Parameters<typeof mockRouter.replace>) =>
      mockRouter.replace(...args),
    );
    usePathname.mockImplementation(() => mockRouter.pathname);
    useSearchParams.mockImplementation(() => {
      const searchParams = useMemo(
        () => new ReadonlyURLSearchParams(new URLSearchParams(mockRouter.query as Record<string, string>)),
        [mockRouter.query],
      );
      return searchParams;
    });
  },
};

export default preview;
