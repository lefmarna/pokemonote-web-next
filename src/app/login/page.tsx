import { Login } from './Login'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('ログイン')

export default function Page() {
  return <Login />
}
