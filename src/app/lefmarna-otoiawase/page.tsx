import { getMetadata } from '@/libs/metadata'
import { LefmarnaOtoiawase } from './LefmarnaOtoiawase'

export const metadata = getMetadata('お問い合わせ')

export default function Page() {
  return <LefmarnaOtoiawase />
}
