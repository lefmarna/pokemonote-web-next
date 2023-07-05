import { useRouter } from 'next/router'
import { useCallback } from 'react'

export const useMeta = () => {
  const router = useRouter()

  const getMetaTitle = (title: string) => `Pokemonote | ${title}`

  const metaRouter = useCallback(() => {
    switch (router.pathname) {
      case '/login':
        return {
          title: getMetaTitle('ログイン'),
        }
      case '/calc-stats':
        return {
          title: getMetaTitle('ステータス計算機（SV）'),
          description:
            'ポケモンSVに対応したステータス計算機です。ヒスイの新ポケモンにも対応！ リアルタイムで計算が行われるため、個体値や努力値の変更を確認しながら計算できます。実数値から努力値の逆算にも対応、耐久調整を自動で行ってくれる機能も搭載しています。計算結果を投稿することで、あとから見返したり友達とシェアすることもできます！',
        }
      case '/calc-speed':
        return {
          title: getMetaTitle('素早さ計算機（SV）'),
          description:
            'ポケモンSVに対応している素早さ計算機です。ヒスイの新ポケモンにも対応！ 実数値を入力することで、追い風や麻痺、湿原といったあらゆる状態の素早さをリアルタイムに表示します。すいすいや葉緑素などの特性、スカーフや鉄球といった持ち物を含んだ計算にも対応している、高機能な素早さ計算ツールとなっています。',
        }
      case '/base-stats-ranking':
        return {
          title: getMetaTitle('種族値ランキング（SV）'),
          description:
            'ポケモンSVの種族値ランキングです。攻撃や特攻、素早さを除いた実質種族値でのリストアップも可能です。伝説や幻のポケモンを表示するオプション、各種ステータスでソートする機能にも対応しています。準伝や600属の暴れる環境で、採用するポケモンに迷った際には、きっとこのツールが役立つことでしょう。',
        }
      default:
        return {
          title: 'Pokemonote',
        }
    }
  }, [router.pathname])

  const defaultMetaDescription =
    'ポケモンのステータスを計算・管理するためのWebアプリ『Pokemonote』へようこそ！ 素早さ計算機やSVに対応した種族値ランキングといったツールも公開しています。「シンプルで高機能」なツールにこだわって制作していますので、是非お試しください。'

  const getMeta = useCallback(() => {
    const meta = metaRouter()

    return {
      title: meta.title,
      description: meta.description ?? defaultMetaDescription,
    }
  }, [metaRouter])

  return {
    getMeta,
  }
}
