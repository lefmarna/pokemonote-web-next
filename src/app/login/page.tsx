import { Metadata } from 'next'
import Login from './Login'

export const metadata: Metadata = {
  title: 'ログイン',
}

export default function Page() {
  return <Login />
}
