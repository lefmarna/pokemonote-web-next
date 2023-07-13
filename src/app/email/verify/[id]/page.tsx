'use client'

import { noAuthMiddleware } from '@/hocs/noAuthMiddleware'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthUserMutators } from '@/store/authUserState'

const VerifyEmail = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { updateAuthUser } = useAuthUserMutators()

  ;(async () => {
    try {
      const response = await axios.get(
        `/email/verify/${searchParams.get('id')}?expires=${searchParams.get(
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
}

export default noAuthMiddleware(VerifyEmail)
