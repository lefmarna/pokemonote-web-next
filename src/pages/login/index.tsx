import axios from 'axios'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { AuthUser } from '@/types'
import { MessageAlert } from '@/components/organisms/MessageAlert'
import { EmailField } from '@/components/molecules/EmailField'
import { PasswordField } from '@/components/molecules/PasswordField'
import { exceptionErrorToArray } from '@/utils/utilities'
import { useAuthUserMutators, useAuthUserState } from '@/store/authUserState'
import {
  useRememberRouteMutators,
  useRememberRouteState,
} from '@/store/rememberRouteState'
import { Meta } from '@/components/organisms/Meta'
import { useIsInitializationState } from '@/store/isInitializationState'
import noAuthMiddleware from '@/hocs/noAuthMiddleware'
import FormTemplate from '@/components/templates/FormTemplate'

const Login = () => {
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

  useEffect(() => {
    if (!authUser || !isInitialization) return

    if (rememberRoute !== '') {
      router.push(rememberRoute).then(() => {
        updateRememberRoute('')
      })
    } else {
      router.push('/')
    }
  }, [authUser, isInitialization, rememberRoute, router, updateRememberRoute])

  const updatePassword = useCallback((newPassword: string) => {
    setPassword(newPassword)
  }, [])

  const login = async () => {
    setIsLoading(true)

    try {
      const response = await axios.post<{ data: AuthUser }>('/login', {
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
      <Meta title="ログイン" />
      <FormTemplate
        title="ログイン"
        buttonText="ログイン"
        isLoading={isLoading}
        errors={errors}
        links={links}
        onSubmit={login}
      >
        <EmailField required setValue={setEmail} />
        <PasswordField
          required
          value={password}
          updatePassword={updatePassword}
        />
      </FormTemplate>
      <MessageAlert open={isShowAlert} setOpen={setIsShowAlert} />
    </>
  )
}

export default noAuthMiddleware(Login)
