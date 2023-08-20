import { Settings } from './Settings'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('設定')

export default function Page() {
  return <Settings />
}
