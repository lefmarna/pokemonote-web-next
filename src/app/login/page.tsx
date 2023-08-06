import { getMetadata } from '@/libs/metadata'
import { Login } from './Login'

export const metadata = getMetadata('ログイン')

export default function Page() {
  return <Login />
}
