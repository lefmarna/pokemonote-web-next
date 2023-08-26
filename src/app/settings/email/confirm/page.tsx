import { SettingsEmailConfirm } from './SettingsEmailConfirm'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('メールアドレスの変更')

export default function Page() {
  return <SettingsEmailConfirm />
}
