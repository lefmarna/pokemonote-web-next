import { getMetadata } from '@/libs/metadata'
import { Register } from './Register'

export const metadata = getMetadata('アカウント作成')

export default function Page() {
  return <Register />
}
