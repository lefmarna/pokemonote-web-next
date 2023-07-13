'use client'

import { exceptionErrorToArray } from '@/utils/utilities'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormTemplate } from '@/components/templates/FormTemplate'
import { PasswordInput } from '@/components/forms/PasswordInput'
import { Title } from '@/components/molecules/Title'
import { useEmotion } from '@/hooks/style/useEmotion'
import { Container } from '@mui/material'

export default function VerifyPassword() {
  const searchParams = useSearchParams()

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

  useEffect(() => {
    ;(async () => {
      try {
        await axios.get(
          `/password/verify/${searchParams.get(
            'id'
          )}?expires=${searchParams.get(
            'expires'
          )}&signature=${searchParams.get('signature')}`
        )
        setIsSuccess(true)
      } catch (error) {
        console.log(error)
        setIsSuccess(false)
      } finally {
        setIsConfirm(false)
      }
    })()
  }, [searchParams])

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
        <PasswordInput
          value={resetPasswordParams.new_password}
          label="新しいパスワード"
          setValue={updateNewPassword}
        />
        <PasswordInput
          value={resetPasswordParams.new_password_confirmation}
          label="確認用パスワード"
          setValue={updateNewPasswordConfirmation}
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
