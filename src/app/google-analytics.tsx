'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

export const GoogleAnalytics = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

  useEffect(() => {
    if (GA_TRACKING_ID === undefined) return
    if (typeof window === 'undefined') return

    const url =
      searchParams.toString() === '' ? pathname : `${pathname}?${searchParams}`

    gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }, [GA_TRACKING_ID, pathname, searchParams])

  if (GA_TRACKING_ID === undefined) return null

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
           `,
        }}
      />
    </>
  )
}
