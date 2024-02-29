import { Suspense } from 'react'
import { RegisterVerify } from './RegisterVerify'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('メール認証')

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterVerify />
    </Suspense>
  )
}
