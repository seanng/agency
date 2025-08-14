import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const { locales, defaultLocale } = routing

  const staticPages = [
    '',
    '/about',
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  staticPages.forEach((page) => {
    const entry: any = {
      url: `${baseUrl}${defaultLocale === 'zh' ? '' : `/${defaultLocale}`}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'daily' : 'monthly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: {},
      },
    }

    locales.forEach((locale) => {
      if (locale === defaultLocale) {
        entry.alternates.languages[locale] = `${baseUrl}${page}`
      } else {
        entry.alternates.languages[locale] = `${baseUrl}/${locale}${page}`
      }
    })

    sitemapEntries.push(entry)
  })

  return sitemapEntries
}