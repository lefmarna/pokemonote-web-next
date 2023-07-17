import { Metadata } from 'next'
import { EmailVerify } from './EmailVerify'

export const metadata: Metadata = {
  title: 'メール認証',
}

export default function Page() {
  return <EmailVerify />
}
