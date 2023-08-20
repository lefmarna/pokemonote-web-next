import { Register } from './Register'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('アカウント作成')

export default function Page() {
  return <Register />
}
