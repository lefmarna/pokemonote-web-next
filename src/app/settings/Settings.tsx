'use client'

import { authMiddleware } from '@/hocs/authMiddleware'

export const Settings = authMiddleware(() => {
  return <>設定</>
})
