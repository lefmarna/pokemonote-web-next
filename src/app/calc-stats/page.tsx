import { Metadata } from 'next'
import { CalcStats } from './CalcStats'

export const metadata: Metadata = {
  title: 'ステータス計算機（SV）',
  description:
    'ポケモンSVに対応したステータス計算機です。ヒスイの新ポケモンにも対応！ リアルタイムで計算が行われるため、個体値や努力値の変更を確認しながら計算できます。実数値から努力値の逆算にも対応、耐久調整を自動で行ってくれる機能も搭載しています。計算結果を投稿することで、あとから見返したり友達とシェアすることもできます！',
}

export default function Page() {
  return <CalcStats />
}
