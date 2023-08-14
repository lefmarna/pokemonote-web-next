'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { noAuthMiddleware } from '@/hocs/noAuthMiddleware'
import { useAuthUserMutators } from '@/store/authUserState'
import { apiRequest } from '@/utils/helpers/callApi'

export const EmailVerify = noAuthMiddleware(() => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { updateAuthUser } = useAuthUserMutators()

  ;(async () => {
    try {
      const response = await apiRequest({
        url: `/api/v2/email/verify/{id}`,
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
