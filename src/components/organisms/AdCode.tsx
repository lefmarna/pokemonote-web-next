'use client'

import { memo, useLayoutEffect } from 'react'
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

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-3240586325286249"
      data-ad-slot={slot}
      data-ad-format={format}
      data-adtest={
        process.env.NEXT_PUBLIC_NODE_ENV !== 'production' ? 'on' : 'off'
      }
      data-full-width-responsive={responsive}
    />
  )
})
