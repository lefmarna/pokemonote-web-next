'use client'

export const GoogleAdsense = () => {
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'local') return null

  // NOTE: consoleにAdsense head tag doesn't support data-nscript attribute.の警告が出るため、next/scriptではなく、scriptタグで対応
  return (
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3240586325286249"
      crossOrigin="anonymous"
    />
  )
}
