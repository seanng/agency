import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import { routing } from '../../i18n/routing';
import Sidebar from '@/components/layout/Sidebar';
import CartProviderWrapper from '@/components/providers/CartProviderWrapper';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    template: '%s | 极简T恤商店',
    default: '极简T恤商店 - 纯净美学',
  },
  description:
    '探索极简主义T恤的纯净美学。精选面料与工艺，呈现纯粹的穿着体验。',
  keywords: ['极简T恤', '纯净美学', '简约设计', '精选面料', 'T恤商店'],
  authors: [{ name: 'Ging Mockup Store' }],
  creator: 'Ging Mockup Store',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: '/',
    title: '极简T恤商店 - 纯净美学',
    description:
      '探索极简主义T恤的纯净美学。精选面料与工艺，呈现纯粹的穿着体验。',
    siteName: '极简T恤商店',
  },
  twitter: {
    card: 'summary_large_image',
    title: '极简T恤商店 - 纯净美学',
    description:
      '探索极简主义T恤的纯净美学。精选面料与工艺，呈现纯粹的穿着体验。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      zh: '/',
    },
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <CartProviderWrapper>
            <Sidebar />
            {children}
          </CartProviderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
