import { exceptionErrorToArray } from '@/utils/utilities'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormTemplate } from '../../../components/templates/FormTemplate'
import { PasswordField } from '@/components/molecules/PasswordField'
import { Title } from '@/components/molecules/Title'
import { useEmotion } from '@/hooks/style/useEmotion'
import { Container } from '@mui/material'

export default function VerifyPassword() {
  const [isConfirm, setIsConfirm] = useState(true)
  const [isSuccess, setIsSuccess] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const [resetPasswordParams, setResetPasswordParams] = useState({
    new_password: '',
    new_password_confirmation: '',
  })

  const updateRestPasswordParams = (
    newPasswords: Partial<typeof resetPasswordParams>
  ) => {
    setResetPasswordParams((prevState) => ({
      ...prevState,
      ...newPasswords,
    }))
  }

  const updateNewPassword = (newPassword: string) => {
    updateRestPasswordParams({ new_password: newPassword })
  }

  const updateNewPasswordConfirmation = (newPassword: string) => {
    updateRestPasswordParams({ new_password_confirmation: newPassword })
  }

  const router = useRouter()

  ;(async () => {
    try {
      await axios.get(
        `/password/verify/${router.query.id}?expires=${router.query.expires}&signature=${router.query.signature}`
      )
      setIsSuccess(true)
    } catch (error) {
      console.log(error)
      setIsSuccess(false)
    } finally {
      setIsConfirm(false)
    }
  })()

  const submit = async () => {
    setIsLoading(true)
    try {
      await axios.put('/password/reset', resetPasswordParams)
      setIsSubmit(true)
      setErrors([])
    } catch (error) {
      setErrors(exceptionErrorToArray(error, [422]))
    } finally {
      setIsLoading(false)
    }
  }

  const { StyledLink } = useEmotion()

  if (isConfirm) return <div>パスワード再設定用URLの検証中...</div>

  if (isSuccess && !isSubmit) {
    return (
      <FormTemplate
        title="パスワード再設定"
        buttonText="送信"
        errors={errors}
        isLoading={isLoading}
        onSubmit={submit}
      >
        <PasswordField
          value={resetPasswordParams.new_password}
          label="新しいパスワード"
          updatePassword={updateNewPassword}
        />
        <PasswordField
          value={resetPasswordParams.new_password_confirmation}
          label="確認用パスワード"
          updatePassword={updateNewPasswordConfirmation}
        />
      </FormTemplate>
    )
  }

  return (
    <Container>
      <Title text="パスワード再設定" />
      <p>
        {isSubmit
          ? 'パスワード再設定が完了しました。'
          : 'パスワード再設定用URLの検証に失敗しました。\nお手数ですが再度お試しください。'}
      </p>
      <StyledLink href="/">トップページへ戻る</StyledLink>
    </Container>
  )
}
