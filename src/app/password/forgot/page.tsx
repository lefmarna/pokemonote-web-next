import { Metadata } from 'next'
import { PasswordForgot } from './PasswordForgot'

export const metadata: Metadata = {
  title: 'パスワード再設定の申請',
}

export default function Page() {
  return <PasswordForgot />
}
