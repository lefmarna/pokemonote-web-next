'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { noAuthMiddleware } from '@/hocs/noAuthMiddleware'
import { useAuthUserMutators } from '@/store/authUserState'
import { requestApi } from '@/utils/helpers/requestApi'

export const RegisterVerify = noAuthMiddleware(() => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { updateAuthUser } = useAuthUserMutators()

  ;(async () => {
    try {
      const response = await requestApi({
        url: '/api/v2/register/verify/{id}',
        method: 'get',
        pathParameters: {
          id: searchParams.get('id') ?? '',
        },
        queryParameters: {
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
  })()

  return <div>メール認証中...</div>
})
