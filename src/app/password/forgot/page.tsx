import { PasswordForgot } from './PasswordForgot'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('パスワード再設定の申請')

export default function Page() {
  return <PasswordForgot />
}
