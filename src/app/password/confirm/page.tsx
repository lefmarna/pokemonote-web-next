import { getMetadata } from '@/libs/metadata'
import { PasswordConfirm } from './PasswordConfirm'

export const metadata = getMetadata('パスワード再設定の受付')

export default function Page() {
  return <PasswordConfirm />
}
