'use client'

import Script from 'next/script'
import { memo, useEffect, useState } from 'react'
import type { CSSProperties } from 'react'

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[]
  }
}

type Props = {
  slot: string
  style?: CSSProperties
  format?: string
  responsive?: string
}

export const AdCode = memo(function AdCode(props: Props) {
  const {
    slot,
    style = { display: 'block' },
    format = 'auto',
    responsive = 'true',
  } = props

  console.log('ad code')

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

  if (process.env.NEXT_PUBLIC_NODE_ENV === 'local') return null
  if (isLoading) return null

  return (
    <>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-3240586325286249"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
      <Script
        id={String(Math.random())}
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: '(window.adsbygoogle = window.adsbygoogle || []).push({});',
        }}
      />
    </>
  )
})
