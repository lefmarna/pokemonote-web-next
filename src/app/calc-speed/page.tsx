import { CalcSpeed } from './CalcSpeed'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata(
  '素早さ計算機（ポケモンSV）',
  'ポケモンSVに対応している素早さ計算機です。ヒスイの新ポケモンにも対応！ 実数値を入力することで、追い風や麻痺、湿原といったあらゆる状態の素早さをリアルタイムに表示します。すいすいや葉緑素などの特性、スカーフや鉄球といった持ち物を含んだ計算にも対応している、高機能な素早さ計算ツールとなっています。'
)

export default function Page() {
  return <CalcSpeed />
}
