import axios from 'axios'
import { authUserState, rememberRouteState } from '../store'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { FormTemplate } from '../components/templates/FormTemplate'
import { AuthUser } from '../types'
import { MessageAlert } from '../components/organisms/MessageAlert'
import { EmailField } from '../components/molecules/EmailField'
import { PasswordField } from '../components/molecules/PasswordField'

const Login: NextPage = () => {
  const router = useRouter()
  const setAuthUser = useSetRecoilState(authUserState)
  const rememberRoute = useRecoilValue(rememberRouteState)
  const [isShowAlert, setIsShowAlert] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <FormTemplate title="ログイン" buttonText="ログイン" isLoading={isLoading} submit={login}>
        <EmailField required setValue={setEmail} />
        <PasswordField required setValue={setPassword} />
      </FormTemplate>
      <MessageAlert open={isShowAlert} setOpen={setIsShowAlert} />
    </>
  )
}

export default Login
