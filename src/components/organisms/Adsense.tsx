import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'
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

export const Adsense = (props: Props) => {
  const {
    slot,
    style = { display: 'block' },
    format,
    responsive = 'false',
  } = props

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const asPath = useMemo(() => {
    return searchParams.toString() === ''
      ? pathname
      : `${pathname}?${searchParams}`
  }, [pathname, searchParams])

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error(error)
    }
  }, [asPath])

  if (process.env.NEXT_PUBLIC_NODE_ENV === 'local') return null

  return (
    <div key={asPath}>
      <ins
        className="adsbygoogle"
        style={style}
        data-adtest={
          process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? 'off' : 'on'
        }
        data-ad-client="ca-pub-3240586325286249"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}
