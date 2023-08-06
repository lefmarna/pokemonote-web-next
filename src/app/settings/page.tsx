import { getMetadata } from '@/libs/metadata'
import { Settings } from './Settings'

export const metadata = getMetadata('設定')

export default function Page() {
  return <Settings />
}
