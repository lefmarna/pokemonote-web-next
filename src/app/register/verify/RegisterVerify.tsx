'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { noAuthMiddleware } from '@/hocs/noAuthMiddleware'
import { useAuthUserMutators } from '@/store/authUserState'
import { requestOpenapi } from '@/utils/helpers'

export const RegisterVerify = noAuthMiddleware(() => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { updateAuthUser } = useAuthUserMutators()

  const register = async () => {
    try {
      const response = await requestOpenapi({
        url: '/api/v2/register/verify/{id}',
        method: 'get',
        path: {
          id: searchParams.get('id') ?? '',
        },
        query: {
          expires: searchParams.get('expires') ?? '',
          signature: searchParams.get('signature') ?? '',
        },
      })

      updateAuthUser(response.data.data)
      // store.dispatch('notice')
    } catch (error) {
      console.log(error)
    }
    router.push('/')
  }
  register()

  return <div>メール認証中...</div>
})
