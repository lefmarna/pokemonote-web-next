import { PasswordConfirm } from './PasswordConfirm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'パスワード再設定の受付',
}

export default function Page() {
  return <PasswordConfirm />
}
