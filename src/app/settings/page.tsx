import { Settings } from './Settings'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '設定',
}

export default function Page() {
  return <Settings />
}
