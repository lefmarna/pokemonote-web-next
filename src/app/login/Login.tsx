'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { EmailInput } from '@/components/forms/EmailInput'
import { PasswordInput } from '@/components/forms/PasswordInput'
import { MessageAlert } from '@/components/organisms/MessageAlert'
import { FormTemplate } from '@/components/templates/FormTemplate'
import { noAuthMiddleware } from '@/hocs/noAuthMiddleware'
import { useAuthUserMutators } from '@/store/authUserState'
import { useSnackbarMutators } from '@/store/snackbarState'
import { exceptionErrorToArray, requestOpenapi } from '@/utils/helpers'

export const Login = noAuthMiddleware(() => {
  const router = useRouter()
  const { updateAuthUser } = useAuthUserMutators()
  const [isShowAlert, setIsShowAlert] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { showSnackBar } = useSnackbarMutators()

  const login = async () => {
    setIsLoading(true)

    try {
      const response = await requestOpenapi({
        url: '/api/v2/login',
        method: 'post',
        data: {
          email,
          password,
        },
      })
      const _authUser = response.data.data

      if (!_authUser.isAuthenticated) {
        localStorage.setItem('email', _authUser.email)
        router.push('/register/resend')
        return
      }

      updateAuthUser(_authUser)
      setIsShowAlert(true)
      showSnackBar('ログインしました')
    } catch (error) {
      setErrors(exceptionErrorToArray(error))
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const links = [
    {
      href: '/register',
      text: '新規会員登録はこちら',
    },
    {
      href: '/password/forgot',
      text: 'パスワードをお忘れの方はこちら',
    },
  ]

  return (
    <>
      <FormTemplate
        title="ログイン"
        buttonText="ログイン"
        isLoading={isLoading}
        errors={errors}
        links={links}
        onSubmit={login}
      >
        <EmailInput value={email} setValue={setEmail} required />
        <PasswordInput value={password} setValue={setPassword} required />
      </FormTemplate>
      <MessageAlert open={isShowAlert} setOpen={setIsShowAlert} />
    </>
  )
})
