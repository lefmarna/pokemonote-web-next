import { Meta } from '@/components/organisms/Meta'
import { noAuthMiddleware } from '@/hocs/noAuthMiddleware'
import { FormTemplate } from '../../components/templates/FormTemplate'
import { EmailField } from '../../components/molecules/EmailField'
import { PasswordField } from '../../components/molecules/PasswordField'
import { useCallback, useState } from 'react'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const updatePassword = useCallback((newPassword: string) => {
    setPassword(newPassword)
  }, [])

  return (
    <>
      <Meta title="アカウント作成" button-text="新規登録" />
      <FormTemplate title="アカウント作成">
        <EmailField value={email} setValue={setEmail} required />
        <PasswordField
          value={password}
          updatePassword={updatePassword}
          required
        />
      </FormTemplate>
    </>
  )
}

export default noAuthMiddleware(Register)
