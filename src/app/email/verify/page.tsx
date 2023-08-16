import { getMetadata } from '@/libs/metadata'
import { EmailVerify } from './EmailVerify'

export const metadata = getMetadata('メール認証')

export default function Page() {
  return <EmailVerify />
}
