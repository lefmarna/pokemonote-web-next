import { TextField } from '@mui/material'
import axios from 'axios'
import { NextPage } from 'next'
import { ChangeEvent } from 'react'
import { useState } from 'react'
import { FormTemplate } from '../components/templates/FormTemplate'
import { AuthUser } from '../types'

const Login: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const updateEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const updatePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const login = async () => {
    setIsLoading(true)

    try {
      const response = await axios.post<{ data: AuthUser }>('/login', { email, password })
      const authUser = response.data.data
      if (!authUser.email_verified_at) {
        localStorage.setItem('email', authUser.email)
        // router.push('/email/resend')
        return
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <FormTemplate title="ログイン" buttonText="ログイン" isLoading={isLoading} submit={login}>
        <TextField
          required
          label="メールアドレス"
          type="email"
          value={email}
          onChange={updateEmail}
        />
        <TextField
          required
          label="パスワード"
          type="password"
          value={password}
          onChange={updatePassword}
        />
      </FormTemplate>
    </>
  )
}

export default Login
