import { Suspense } from 'react'
import { BaseStatsRanking } from './BaseStatsRanking'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata(
  '種族値ランキング（ポケモンSV）',
  'ポケモンSVの種族値ランキングです。攻撃や特攻、素早さを除いた実質種族値でのリストアップも可能です。伝説や幻のポケモンを表示するオプション、各種ステータスでソートする機能にも対応しています。準伝や600属の暴れる環境で、採用するポケモンに迷った際には、きっとこのツールが役立つことでしょう。'
)

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BaseStatsRanking />
    </Suspense>
  )
}
