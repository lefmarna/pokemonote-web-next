import { Meta } from '@/components/organisms/Meta'
import { noAuthMiddleware } from '@/hocs/noAuthMiddleware'
import { FormTemplate } from '../../components/templates/FormTemplate'
import { EmailInput } from '../../components/forms/EmailInput'
import { PasswordInput } from '../../components/forms/PasswordInput'
import { useCallback, useState } from 'react'
import { UsernameInput } from '@/components/forms/UsernameInput'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const updatePassword = useCallback((newPassword: string) => {
    setPassword(newPassword)
  }, [])

  return (
    <>
      <Meta title="アカウント作成" button-text="新規登録" />
      <FormTemplate title="アカウント作成">
        <UsernameInput value={username} setValue={setUsername} required />
        <EmailInput value={email} setValue={setEmail} required />
        <PasswordInput
          value={password}
          updatePassword={updatePassword}
          required
        />
      </FormTemplate>
    </>
  )
}

export default noAuthMiddleware(Register)
