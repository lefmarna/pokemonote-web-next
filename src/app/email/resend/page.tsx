import { EmailResend } from './EmailResend'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'メール確認',
}

export default function Page() {
  return <EmailResend />
}
