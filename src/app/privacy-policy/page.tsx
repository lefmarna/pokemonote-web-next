import { PrivacyPolicy } from './PrivacyPolicy'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '利用規約',
}

export default function Page() {
  return <PrivacyPolicy />
}
