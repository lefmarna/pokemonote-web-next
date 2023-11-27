'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { EmailInput } from '@/components/forms/EmailInput'
import { NicknameInput } from '@/components/forms/NicknameInput'
import { PasswordInput } from '@/components/forms/PasswordInput'
import { UsernameInput } from '@/components/forms/UsernameInput'
import { FormTemplate } from '@/components/templates/FormTemplate'
import { noAuthMiddleware } from '@/hocs/noAuthMiddleware'
import { exceptionErrorToArray, requestOpenapi } from '@/utils/helpers'

export const Register = noAuthMiddleware(() => {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const register = async () => {
    // 画像のデータはformDataを介さないと送れない
    const formData = new FormData()
    formData.append('username', username)
    formData.append('nickname', nickname)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('password_confirmation', passwordConfirmation)

    setIsLoading(true)

    try {
      const response = await requestOpenapi({
        url: '/api/v2/register/tentative',
        method: 'post',
        data: formData,
      })
      localStorage.setItem('email', response.data.data.email)
      router.push('/register/resend')
    } catch (error) {
      setErrors(exceptionErrorToArray(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormTemplate
      title="アカウント作成"
      buttonText="新規登録"
      isLoading={isLoading}
      errors={errors}
      onSubmit={register}
    >
      <UsernameInput value={username} setValue={setUsername} required />
      <NicknameInput value={nickname} setValue={setNickname} required />
      <EmailInput value={email} setValue={setEmail} required />
      <PasswordInput value={password} setValue={setPassword} required />
      <PasswordInput
        label="パスワード確認"
        value={passwordConfirmation}
        setValue={setPasswordConfirmation}
        required
      />
    </FormTemplate>
  )
})
