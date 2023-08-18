import { getMetadata } from '@/libs/metadata'
import { RegisterVerify } from './RegisterVerify'

export const metadata = getMetadata('メール認証')

export default function Page() {
  return <RegisterVerify />
}
