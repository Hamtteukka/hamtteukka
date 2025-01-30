'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HydrationBoundary, HydrationBoundaryProps, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export const ReactQueryProviders = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 300 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={process.env.NODE_ENV === 'development'} />
    </QueryClientProvider>
  );
};

export const Hydrate = (props: HydrationBoundaryProps) => {
  return <HydrationBoundary {...props} />;
};
