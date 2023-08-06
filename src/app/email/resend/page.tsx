import { getMetadata } from '@/libs/metadata'
import { EmailResend } from './EmailResend'

export const metadata = getMetadata('メール確認')

export default function Page() {
  return <EmailResend />
}
