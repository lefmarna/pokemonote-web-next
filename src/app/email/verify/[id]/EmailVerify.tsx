'use client'

import axios from 'axios'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { noAuthMiddleware } from '@/hocs/noAuthMiddleware'
import { useAuthUserMutators } from '@/store/authUserState'

export const EmailVerify = noAuthMiddleware(() => {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()

  const { updateAuthUser } = useAuthUserMutators()

  ;(async () => {
    try {
      const response = await axios.get(
        `/email/verify/${params.id}?expires=${searchParams.get(
          'expires'
        )}&signature=${searchParams.get('signature')}`
      )

      updateAuthUser(response.data.data)
      // store.dispatch('notice')
    } catch (error) {
      console.log(error)
    }
    router.push('/')
  })()

  return <div>メール認証中...</div>
})
