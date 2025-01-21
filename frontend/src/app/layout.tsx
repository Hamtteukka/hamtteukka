import type { Metadata } from 'next';
import { Nanum_Gothic } from 'next/font/google';
import './globals.css';

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
      <body className={`${nanumGothic.className} antialiased`}>{children}</body>
    </html>
  );
}
