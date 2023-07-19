import { PasswordVerify } from './PasswordVerify'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'パスワード再設定',
}

export default function Page() {
  return <PasswordVerify />
}
