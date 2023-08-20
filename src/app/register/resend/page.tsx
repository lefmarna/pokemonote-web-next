import { RegisterResend } from './RegisterResend'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('メール確認')

export default function Page() {
  return <RegisterResend />
}
