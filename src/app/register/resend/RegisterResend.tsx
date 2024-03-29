'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { EmailInput } from '@/components/forms/EmailInput'
import { FormTemplate } from '@/components/templates/FormTemplate'
import { noAuthMiddleware } from '@/hocs/noAuthMiddleware'
import { exceptionErrorToArray, requestOpenapi } from '@/utils/helpers'

export const RegisterResend = noAuthMiddleware(() => {
  const router = useRouter()

  const [email, setEmail] = useState(localStorage.getItem('email') ?? '')
  localStorage.removeItem('email')

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  // NOTE 登録直後はローカルストレージを活用するため、非同期通信によるメールアドレスの取得は行わない
  if (email === '') {
    const initSetEmail = async () => {
      const response = await requestOpenapi({
        url: '/api/v2/register/fetch',
        method: 'get',
      })
      if (!response.data) {
        router.replace('/')
        return
      }
      setEmail(response.data.data.email)
    }

    initSetEmail()
  }

  const resend = async (): Promise<void> => {
    try {
      setIsLoading(true)
      await requestOpenapi({
        url: '/api/v2/register/resend',
        method: 'post',
        data: {
          email,
        },
      })
      alert('メールを再送信しました。')
      setErrors([])
    } catch (error) {
      setErrors(exceptionErrorToArray(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormTemplate
      title="メール確認"
      buttonText="確認メールを再送信する"
      isLoading={isLoading}
      errors={errors}
      onSubmit={resend}
    >
      <p>
        登録はまだ完了していません。
        <br />
        メールに記載されたリンクをクリックして本登録を完了してください。
      </p>
      <p>
        メールが届いていない場合、メールアドレスをご確認の上、「確認メールを再送信する」のボタンを押してください。
      </p>
      <EmailInput value={email} setValue={setEmail} required />
    </FormTemplate>
  )
})
