import type { Metadata } from 'next';
import { Nanum_Gothic } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { MSWProvider } from '@/components/msw/MSWWrapper';
import { ReactQueryProviders } from '@/components/ReactQuery';

if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV !== 'production') {
  const { server } = require('@/mocks/http');
  server.listen();
}

export const metadata: Metadata = {
  title: '함뜨까',
  description: '뜨개인을 위한 서비스',
};

const nanumGothic = Nanum_Gothic({ weight: ['400', '700', '800'], subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='kr'>
      <body className={`${nanumGothic.className} flex antialiased`}>
        <MSWProvider>
        <ReactQueryProviders>
          <Navbar />
          <main className='min-w-0 flex-1'>{children}</main>
          <div id='modal-container' />
        </ReactQueryProviders>
        </MSWProvider>
      </body>
    </html>
  );
}
