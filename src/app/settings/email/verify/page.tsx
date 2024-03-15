import { SettingsEmailVerify } from './SettingsEmailVerify'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('メールアドレスの更新')

export default function Page() {
  return <SettingsEmailVerify />
}
