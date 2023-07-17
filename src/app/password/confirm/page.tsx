import { Metadata } from 'next'
import { PasswordConfirm } from './PasswordConfirm'

export const metadata: Metadata = {
  title: 'パスワード再設定の受付',
}

export default function Page() {
  return <PasswordConfirm />
}
