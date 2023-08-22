import { PasswordVerify } from './PasswordVerify'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('パスワード再設定')

export default function Page() {
  return <PasswordVerify />
}
