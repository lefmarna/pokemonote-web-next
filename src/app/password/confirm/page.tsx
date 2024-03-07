import { Suspense } from 'react'
import { PasswordConfirm } from './PasswordConfirm'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('パスワード再設定の受付')

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PasswordConfirm />
    </Suspense>
  )
}
