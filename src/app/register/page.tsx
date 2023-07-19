import { Register } from './Register'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'アカウント作成',
}

export default function Page() {
  return <Register />
}
