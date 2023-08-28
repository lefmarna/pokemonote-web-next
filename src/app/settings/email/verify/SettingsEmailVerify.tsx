'use client'

import { Container } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Title } from '@/components/molecules/Title'
import { useAuthUserMutators } from '@/store/authUserState'
import { requestApi } from '@/utils/helpers'

export const SettingsEmailVerify = () => {
  const searchParams = useSearchParams()
  const [isConfirm, setIsConfirm] = useState(true)
  const [isSuccess, setIsSuccess] = useState(true)

  const { updateAuthUser } = useAuthUserMutators()

  ;(async () => {
    try {
      const response = await requestApi({
        url: '/api/v2/settings/email/verify/{id}/{encryptedEmail}',
        method: 'get',
        pathParameters: {
          userId: searchParams.get('id') ?? '',
          encryptedEmail: searchParams.get('encryptedEmail') ?? '',
        },
        queryParameters: {
          expires: searchParams.get('expires') ?? '',
          signature: searchParams.get('signature') ?? '',
        },
      })
      updateAuthUser(response.data.data)
      setIsSuccess(true)
    } catch (error) {
      console.log(error)
      setIsSuccess(false)
    } finally {
      setIsConfirm(false)
    }
  })()

  if (isConfirm) return <div>メールアドレスの変更を確認中...</div>

  return (
    <Container>
      {isSuccess ? (
        <div>
          <Title text="メールアドレス更新完了" />
          <p>メールアドレスの更新が完了しました。</p>
        </div>
      ) : (
        <div>
          <Title text="メールアドレス更新失敗" />
          <p>
            メールアドレスの更新に失敗しました。
            <br />
            お手数ですが再度お試しください。
          </p>
        </div>
      )}
    </Container>
  )
}
