import { Meta } from '@/components/organisms/Meta'
import { noAuthMiddleware } from '@/hocs/noAuthMiddleware'
import { FormTemplate } from '../../components/templates/FormTemplate'
import { EmailInput } from '../../components/forms/EmailInput'
import { PasswordInput } from '../../components/forms/PasswordInput'
import { useState } from 'react'
import { UsernameInput } from '@/components/forms/UsernameInput'
import { exceptionErrorToArray } from '@/utils/utilities'
import axios from 'axios'
import { Email } from '@/types'
import { useRouter } from 'next/router'
import { NicknameInput } from '@/components/forms/NicknameInput'

const Register = () => {
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
      const response = await axios.post<{ data: Email }>('/register', formData)
      localStorage.setItem('email', response.data.data.email)
      router.push('/email/resend')
    } catch (error) {
      setErrors(exceptionErrorToArray(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Meta title="アカウント作成" />
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
    </>
  )
}

export default noAuthMiddleware(Register)
