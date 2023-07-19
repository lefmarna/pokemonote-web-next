import { EmailVerify } from './EmailVerify'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'メール認証',
}

export default function Page() {
  return <EmailVerify />
}
