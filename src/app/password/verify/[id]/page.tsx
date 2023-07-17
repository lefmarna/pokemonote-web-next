import { Metadata } from 'next'
import { PasswordVerify } from './PasswordVerify'

export const metadata: Metadata = {
  title: 'パスワード再設定',
}

export default function Page() {
  return <PasswordVerify />
}
