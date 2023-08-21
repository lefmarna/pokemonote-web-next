'use client'

import { Container } from '@mui/material'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { $axios } from '@/libs/axios'
import { PasswordInput } from '@/components/forms/PasswordInput'
import { Title } from '@/components/molecules/Title'
import { FormTemplate } from '@/components/templates/FormTemplate'
import { SLink } from '@/styles'
import { exceptionErrorToArray, requestApi } from '@/utils/helpers'

export const PasswordVerify = () => {
  const params = useParams()
  const searchParams = useSearchParams()

  const [isConfirm, setIsConfirm] = useState(true)
  const [isSuccess, setIsSuccess] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const [resetPasswordParams, setResetPasswordParams] = useState({
    newPassword: '',
    newPassword_confirmation: '',
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
    updateRestPasswordParams({ newPassword: newPassword })
  }

  const updateNewPasswordConfirmation = (newPassword: string) => {
    updateRestPasswordParams({ newPassword_confirmation: newPassword })
  }

  useEffect(() => {
    ;(async () => {
      try {
        await $axios.get(
          `/api/v2/password/verify/${params.id}?expires=${searchParams.get(
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
  }, [params.id, searchParams])

  const submit = async () => {
    setIsLoading(true)
    try {
      await requestApi({
        url: '/api/v2/password/reset',
        method: 'put',
        data: resetPasswordParams,
      })
      setIsSubmit(true)
      setErrors([])
    } catch (error) {
      setErrors(exceptionErrorToArray(error, [422]))
    } finally {
      setIsLoading(false)
    }
  }

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
          value={resetPasswordParams.newPassword}
          label="新しいパスワード"
          setValue={updateNewPassword}
        />
        <PasswordInput
          value={resetPasswordParams.newPassword_confirmation}
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
      <SLink href="/">トップページへ戻る</SLink>
    </Container>
  )
}
