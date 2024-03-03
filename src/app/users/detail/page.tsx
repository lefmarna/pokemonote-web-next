import { Suspense } from 'react'
import { UserDetail } from './UserDetail'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserDetail />
    </Suspense>
  )
}
