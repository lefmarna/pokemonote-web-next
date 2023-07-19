'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { $axios } from '@/libs/axios'
import { EmailInput } from '@/components/forms/EmailInput'
import { PasswordInput } from '@/components/forms/PasswordInput'
import { MessageAlert } from '@/components/organisms/MessageAlert'
import { FormTemplate } from '@/components/templates/FormTemplate'
import { noAuthMiddleware } from '@/hocs/noAuthMiddleware'
import { useAuthUserMutators, useAuthUserState } from '@/store/authUserState'
import { useIsInitializationState } from '@/store/isInitializationState'
import {
  useRememberRouteMutators,
  useRememberRouteState,
} from '@/store/rememberRouteState'
import { useSnackbarMutators } from '@/store/snackbarState'
import { exceptionErrorToArray } from '@/utils/utilities'
import type { AuthUser } from '@/types'

export const Login = noAuthMiddleware(() => {
  const router = useRouter()
  const { updateAuthUser } = useAuthUserMutators()
  const authUser = useAuthUserState()
  const rememberRoute = useRememberRouteState()
  const { updateRememberRoute } = useRememberRouteMutators()
  const [isShowAlert, setIsShowAlert] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isInitialization = useIsInitializationState()

  const { showSnackBar } = useSnackbarMutators()

  useEffect(() => {
    if (!authUser || !isInitialization) return

    if (rememberRoute !== '') {
      updateRememberRoute('')
      router.push(rememberRoute)
    } else {
      router.push('/')
    }
  }, [authUser, isInitialization, rememberRoute, router, updateRememberRoute])

  const login = async () => {
    setIsLoading(true)

    try {
      const response = await $axios.post<{ data: AuthUser }>('/login', {
        email,
        password,
      })
      const _authUser = response.data.data

      if (!_authUser.email_verified_at) {
        localStorage.setItem('email', _authUser.email)
        router.push('/email/resend')
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