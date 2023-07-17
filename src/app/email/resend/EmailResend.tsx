'use client'

import { EmailInput } from '@/components/forms/EmailInput'
import { FormTemplate } from '@/components/templates/FormTemplate'
import { useState } from 'react'
import { Email } from '@/types'
import { useRouter } from 'next/navigation'
import { $axios } from '@/utils/axios'
import { exceptionErrorToArray } from '@/utils/utilities'

export const EmailResend = () => {
  const router = useRouter()

  const [email, setEmail] = useState(localStorage.getItem('email') ?? '')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const fetchEmail = () => {
    return $axios.get<{ data: Email }>('/email/fetch')
  }

  // NOTE 登録直後はローカルストレージを活用するため、非同期通信によるメールアドレスの取得は行わない
  if (email === '') {
    ;(async () => {
      const response = await fetchEmail()
      if (!response.data) {
        router.push('/')
        return
      }
      setEmail(response.data.data.email)
    })()
  }

  const resend = async (): Promise<void> => {
    try {
      setIsLoading(true)
      await $axios.post('/email/resend', {
        email: email,
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
}
