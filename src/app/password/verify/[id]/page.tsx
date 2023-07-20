import { getMetadata } from '@/libs/metadata'
import { PasswordVerify } from './PasswordVerify'

export const metadata = getMetadata('パスワード再設定')

export default function Page() {
  return <PasswordVerify />
}
