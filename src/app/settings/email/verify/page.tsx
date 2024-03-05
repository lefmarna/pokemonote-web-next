import { Suspense } from 'react'
import { SettingsEmailVerify } from './SettingsEmailVerify'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('メールアドレスの更新')

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsEmailVerify />
    </Suspense>
  )
}
