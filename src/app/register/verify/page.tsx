import { RegisterVerify } from './RegisterVerify'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('メール認証')

export default function Page() {
  return <RegisterVerify />
}
