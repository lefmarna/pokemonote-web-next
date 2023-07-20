import { getMetadata } from '@/libs/metadata'
import { PrivacyPolicy } from './PrivacyPolicy'

export const metadata = getMetadata('利用規約')

export default function Page() {
  return <PrivacyPolicy />
}
