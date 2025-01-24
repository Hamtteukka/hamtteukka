'use client';

import { Suspense, use } from 'react';
import { handlers } from '@/mocks/handlers';

const mockingEnabledPromise =
  typeof window !== 'undefined'
    ? import('@/mocks/browser').then(async ({ default: worker }) => {
        if (process.env.NODE_ENV === 'production') {
          return;
        }
        await worker.start({
          onUnhandledRequest(request, print) {
            if (request.url.includes('_next')) {
              return;
            }
            print.warning();
          },
        });
        worker.use(...handlers);

        /* 
        Next.js opened issue
        https://github.com/vercel/next.js/issues/69098
        */
        (module as any).hot?.dispose(() => {
          worker.stop();
        });
      })
    : Promise.resolve();

export const MSWProvider: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
};

const MSWProviderWrapper: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  use(mockingEnabledPromise);
  return children;
};
