'use client'

import { Suspense } from 'react'
import { GoogleAnalytics } from './google-analytics'

export const GoogleAnalyticsWrapper = () => {
  return (
    <Suspense>
      <GoogleAnalytics />
    </Suspense>
  )
}
