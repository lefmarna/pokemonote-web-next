'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { memo, useEffect } from 'react'
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

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window === 'undefined') return
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [pathname, searchParams])

  if (process.env.NEXT_PUBLIC_NODE_ENV === 'local') return null

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-3240586325286249"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  )
})
