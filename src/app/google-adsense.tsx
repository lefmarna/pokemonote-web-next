'use client'

import Script from 'next/script'

export const GoogleAdsense = () => {
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'local') return null

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3240586325286249"
      crossOrigin="anonymous"
    />
  )
}
