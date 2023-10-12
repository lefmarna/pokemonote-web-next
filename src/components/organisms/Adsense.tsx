import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[]
  }
}

export const Adsense = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error(error)
    }
  }, [pathname, searchParams])

  if (process.env.NEXT_PUBLIC_NODE_ENV === 'local') return null

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'inline-block', width: '232px', marginTop: '12px' }}
      data-ad-client="ca-pub-3240586325286249"
      data-ad-slot="4559543564"
    />
  )
}
