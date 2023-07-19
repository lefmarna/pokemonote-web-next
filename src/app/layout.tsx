import './globals.scss'
import { Inter } from 'next/font/google'
import { AppInit } from './app-init'
import { BaseLayout } from './base-layout'
import { Providers } from './providers'
import SnackbarComponent from '@/components/organisms/SnackBarComponent'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Pokemonote',
    template: '%s | Pokemonote',
  },
  description:
    'ポケモンのステータスを計算・管理するためのWebアプリ『Pokemonote』へようこそ！ 素早さ計算機やSVに対応した種族値ランキングといったツールも公開しています。「シンプルで高機能」なツールにこだわって制作していますので、是非お試しください。',
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
