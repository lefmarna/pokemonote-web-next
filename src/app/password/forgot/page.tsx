import { PasswordForgot } from './PasswordForgot'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'パスワード再設定の申請',
}

export default function Page() {
  return <PasswordForgot />
}
