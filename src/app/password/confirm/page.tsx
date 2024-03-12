import { PasswordConfirm } from './PasswordConfirm'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('パスワード再設定の受付')

export default function Page() {
  return <PasswordConfirm />
}
