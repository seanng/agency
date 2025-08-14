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
    template: '%s | 奢华腕表精品店',
    default: '奢华腕表精品店 - 时间的艺术',
  },
  description:
    '汇聚世界顶级制表品牌，每一枚腕表都是时间与工艺的完美结晶，演绎腕间的极致奢华。',
  keywords: ['奢华腕表', '劳力士', '百达翡丽', '爱彼', '欧米茄', '卡地亚', '高级腕表', '瑞士手表'],
  authors: [{ name: 'Ging Mockup Store' }],
  creator: 'Ging Mockup Store',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: '/',
    title: '奢华腕表精品店 - 时间的艺术',
    description:
      '汇聚世界顶级制表品牌，每一枚腕表都是时间与工艺的完美结晶，演绎腕间的极致奢华。',
    siteName: '奢华腕表精品店',
  },
  twitter: {
    card: 'summary_large_image',
    title: '奢华腕表精品店 - 时间的艺术',
    description:
      '汇聚世界顶级制表品牌，每一枚腕表都是时间与工艺的完美结晶，演绎腕间的极致奢华。',
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
