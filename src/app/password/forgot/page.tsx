import { getMetadata } from '@/libs/metadata'
import { PasswordForgot } from './PasswordForgot'

export const metadata = getMetadata('パスワード再設定の申請')

export default function Page() {
  return <PasswordForgot />
}
