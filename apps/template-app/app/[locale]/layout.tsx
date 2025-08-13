import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import { routing } from '../../i18n/routing';
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | Agency Template App',
    default: 'Agency Template App',
  },
  description:
    'NextJS template with TypeScript, Tailwind CSS, Next Intl, and Payload CMS',
  keywords: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Next Intl', 'Payload CMS'],
  authors: [{ name: 'Agency' }],
  creator: 'Agency',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES', 'fr_FR'],
    url: '/',
    title: 'Agency Template App',
    description:
      'NextJS template with TypeScript, Tailwind CSS, Next Intl, and Payload CMS',
    siteName: 'Agency Template App',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agency Template App',
    description:
      'NextJS template with TypeScript, Tailwind CSS, Next Intl, and Payload CMS',
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
      'en': '/',
      'es': '/es',
      'fr': '/fr',
    },
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;
  console.log('locale: ', locale);

  if (!routing.locales.includes(locale as any)) {
    console.log(routing.locales);
    console.log(locale);
    notFound();
  }
  console.log('loading layout');

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
