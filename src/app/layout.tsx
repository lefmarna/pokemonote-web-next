import './globals.scss'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from 'next/font/google'
import { AppInit } from './app-init'
import { BaseLayout } from './base-layout'
import { GoogleAdsense } from './google-adsense'
import { Providers } from './providers'
import { DEFAULT_META_DESCRIPTION, DEFAULT_META_TITLE } from '@/utils/helpers'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_FRONTEND_BASE_URL ?? 'http://localhost:3000'
  ),
  title: {
    default: DEFAULT_META_TITLE,
    template: `%s | ${DEFAULT_META_TITLE}`,
  },
  openGraph: {
    title: {
      default: DEFAULT_META_TITLE,
      template: `%s | ${DEFAULT_META_TITLE}`,
    },
    description: DEFAULT_META_DESCRIPTION,
    siteName: DEFAULT_META_TITLE,
    type: 'website',
  },
  twitter: {
    title: {
      default: DEFAULT_META_TITLE,
      template: `%s | ${DEFAULT_META_TITLE}`,
    },
    description: DEFAULT_META_DESCRIPTION,
    site: '@lefmarna',
  },
  description: DEFAULT_META_DESCRIPTION,
  formatDetection: {
    telephone: false,
  },
  ...(process.env.NEXT_PUBLIC_NODE_ENV !== 'production'
    ? { robots: 'noindex,nofollow' }
    : null),
}

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <GoogleAdsense />
      <body className={inter.className}>
        {GA_TRACKING_ID !== undefined && (
          <GoogleAnalytics gaId={GA_TRACKING_ID} />
        )}
        <Providers>
          <AppInit />
          <BaseLayout>{children}</BaseLayout>
        </Providers>
      </body>
    </html>
  )
}
