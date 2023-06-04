import axios from 'axios'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { FormTemplate } from '@/components/templates/FormTemplate'
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

export default function Login() {
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

  useEffect(() => {
    if (!authUser) return

    if (rememberRoute !== '') {
      router.push(rememberRoute).then(() => {
        updateRememberRoute('')
      })
    } else {
      router.push('/')
    }
  }, [authUser, rememberRoute, router, updateRememberRoute])

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

  return (
    <>
      <Meta title="ログイン" />
      <FormTemplate
        title="ログイン"
        buttonText="ログイン"
        isLoading={isLoading}
        errors={errors}
        submit={login}
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
