import { Metadata } from 'next'
import { Settings } from './Settings'

export const metadata: Metadata = {
  title: '設定',
}

export default function Page() {
  return <Settings />
}
