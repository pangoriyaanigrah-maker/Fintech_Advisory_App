import type { Metadata } from 'next';
import { Bodoni_Moda, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const bodoniModa = Bodoni_Moda({
  variable: '--font-bodoni',
  style: ['normal', 'italic'],
  display: 'swap',
  subsets: ['latin'],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: '--font-hanken',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Aarya | Financial Wellness for the Modern Indian Woman',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodoniModa.variable} ${hankenGrotesk.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-surface text-on-surface font-sans selection:bg-tertiary-container/30 overflow-x-hidden antialiased flex flex-col transition-colors duration-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
