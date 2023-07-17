import { Metadata } from 'next'
import { PrivacyPolicy } from './PrivacyPolicy'

export const metadata: Metadata = {
  title: '利用規約',
}

export default function Page() {
  return <PrivacyPolicy />
}
