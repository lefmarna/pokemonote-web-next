import { Suspense } from 'react'
import { CalcStats } from './CalcStats'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata(
  'ステータス計算機（ポケモンSV）',
  'ポケモンSVに対応したステータス計算機です。ヒスイの新ポケモンにも対応！ リアルタイムで計算が行われるため、個体値や努力値の変更を確認しながら計算できます。実数値から努力値の逆算にも対応、耐久調整を自動で行ってくれる機能も搭載しています。計算結果を投稿することで、あとから見返したり友達とシェアすることもできます！'
)

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CalcStats />
    </Suspense>
  )
}
