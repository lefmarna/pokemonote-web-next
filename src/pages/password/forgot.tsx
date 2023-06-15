import { EmailField } from '@/components/molecules/EmailField'
import { FormTemplate } from '@/components/templates/FormTemplate'
import { exceptionErrorToArray } from '@/utils/utilities'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function PasswordForgot() {
  const [errors, setErrors] = useState<string[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')

  const router = useRouter()

  const confirm = async () => {
    setIsLoading(true)

    try {
      const response = await axios.post('/password/email', {
        email: email,
      })

      router.push('/password/confirm')

      console.log(response)
    } catch (error) {
      setErrors(exceptionErrorToArray(error))
    } finally {
      setIsLoading(false)
    }
  }

  const links = [
    {
      href: '/login',
      text: 'ログインページへ戻る',
    },
  ]

  return (
    <FormTemplate
      title="パスワード再設定の申請"
      buttonText="パスワード再設定メールを送信する"
      errors={errors}
      isLoading={isLoading}
      links={links}
      onSubmit={confirm}
    >
      <p>
        本人確認のためにメールをお送りします。メールに添付されたURLよりパスワードの再設定を行ってください。
      </p>
      <EmailField value={email} setValue={setEmail} />
    </FormTemplate>
  )
}
