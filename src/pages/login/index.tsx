import axios from 'axios'
import { authUserState, rememberRouteState } from '@/store'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { FormTemplate } from '@/components/templates/FormTemplate'
import { AuthUser } from '@/types'
import { MessageAlert } from '@/components/organisms/MessageAlert'
import { EmailField } from '@/components/molecules/EmailField'
import { PasswordField } from '@/components/molecules/PasswordField'
import { exceptionErrorToArray } from '@/utils/utilities'

export default function Login() {
  const router = useRouter()
  const setAuthUser = useSetRecoilState(authUserState)
  const rememberRoute = useRecoilValue(rememberRouteState)
  const [isShowAlert, setIsShowAlert] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const updatePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }, [])

  const login = async () => {
    setIsLoading(true)

    try {
      const response = await axios.post<{ data: AuthUser }>('/login', { email, password })
      const _authUser = response.data.data

      if (!_authUser.email_verified_at) {
        localStorage.setItem('email', _authUser.email)
        router.push('/email/resend')
        return
      }

      setAuthUser(_authUser)

      if (rememberRoute) {
        router.push(rememberRoute)
      } else {
        router.push('/')
      }

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
      <FormTemplate
        title="ログイン"
        buttonText="ログイン"
        isLoading={isLoading}
        errors={errors}
        submit={login}
      >
        <EmailField required setValue={setEmail} />
        <PasswordField required updatePassword={updatePassword} />
      </FormTemplate>
      <MessageAlert open={isShowAlert} setOpen={setIsShowAlert} />
    </>
  )
}
