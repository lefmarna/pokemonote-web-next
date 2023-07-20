import './globals.scss'
import { Inter } from 'next/font/google'
import { DEFAULT_META_DESCRIPTION, DEFAULT_META_TITLE } from '@/libs/metadata'
import { AppInit } from './app-init'
import { BaseLayout } from './base-layout'
import { Providers } from './providers'
import SnackbarComponent from '@/components/organisms/SnackBarComponent'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
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
    : { robots: 'noindex,nofollow' }), // NOTE: アプリが完成するまでは、環境問わず常にnoindexとする
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>
          <AppInit />
          <BaseLayout>{children}</BaseLayout>
          <SnackbarComponent />
        </Providers>
      </body>
    </html>
  )
}
