import { Metadata } from 'next'
import { EmailResend } from './EmailResend'

export const metadata: Metadata = {
  title: 'メール確認',
}

export default function Page() {
  return <EmailResend />
}
