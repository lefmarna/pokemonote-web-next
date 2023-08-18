import { getMetadata } from '@/libs/metadata'
import { RegisterResend } from './RegisterResend'

export const metadata = getMetadata('メール確認')

export default function Page() {
  return <RegisterResend />
}
