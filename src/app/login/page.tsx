import { Login } from './Login'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ログイン',
}

export default function Page() {
  return <Login />
}
