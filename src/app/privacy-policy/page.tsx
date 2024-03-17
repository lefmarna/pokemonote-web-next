import { PrivacyPolicy } from './PrivacyPolicy'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('利用規約')

export default function Page() {
  return <PrivacyPolicy />
}
