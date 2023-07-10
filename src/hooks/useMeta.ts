import { useRouter } from 'next/router'
import { useCallback } from 'react'

export const useMeta = () => {
  const router = useRouter()

  const defaultMeta = {
    title: 'Pokemonote',
    description:
      'ポケモンのステータスを計算・管理するためのWebアプリ『Pokemonote』へようこそ！ 素早さ計算機やSVに対応した種族値ランキングといったツールも公開しています。「シンプルで高機能」なツールにこだわって制作していますので、是非お試しください。',
  }

  const metaRouter = useCallback(() => {
    switch (router.pathname) {
      case '/base-stats-ranking':
        return {
          title: '種族値ランキング（SV）',
          description:
            'ポケモンSVの種族値ランキングです。攻撃や特攻、素早さを除いた実質種族値でのリストアップも可能です。伝説や幻のポケモンを表示するオプション、各種ステータスでソートする機能にも対応しています。準伝や600属の暴れる環境で、採用するポケモンに迷った際には、きっとこのツールが役立つことでしょう。',
        }
      case '/calc-stats':
        return {
          title: 'ステータス計算機（SV）',
          description:
            'ポケモンSVに対応したステータス計算機です。ヒスイの新ポケモンにも対応！ リアルタイムで計算が行われるため、個体値や努力値の変更を確認しながら計算できます。実数値から努力値の逆算にも対応、耐久調整を自動で行ってくれる機能も搭載しています。計算結果を投稿することで、あとから見返したり友達とシェアすることもできます！',
        }
      case '/email/verify/[id]':
        return {
          title: 'メール認証',
        }
      case '/email/resend':
        return {
          title: 'メール確認',
        }
      case '/lefmarna-otoiawase':
        return {
          title: 'お問い合わせ',
        }
      case '/lefmarna-otoiawase/thanks':
        return {
          title: '応援ありがとう',
        }
      case '/login':
        return {
          title: 'ログイン',
        }
      case '/password/confirm':
        return {
          title: 'パスワード再設定の受付',
        }
      case '/password/forgot':
        return {
          title: 'パスワード再設定の申請',
        }
      case '/password/verify/[id]':
        return {
          title: 'パスワード再設定',
        }
      case '/pokemons':
        return {
          title: 'みんなの投稿',
        }
      case '/privacy-policy':
        return {
          title: '利用規約',
        }
      case '/register':
        return {
          title: 'アカウント作成',
        }
      case '/settings':
        return {
          title: '設定',
        }
      case '/calc-speed':
        return {
          title: '素早さ計算機（SV）',
          description:
            'ポケモンSVに対応している素早さ計算機です。ヒスイの新ポケモンにも対応！ 実数値を入力することで、追い風や麻痺、湿原といったあらゆる状態の素早さをリアルタイムに表示します。すいすいや葉緑素などの特性、スカーフや鉄球といった持ち物を含んだ計算にも対応している、高機能な素早さ計算ツールとなっています。',
        }
      default:
        return {
          title: defaultMeta.title,
        }
    }
  }, [router.pathname, defaultMeta.title])

  const getMeta = useCallback(() => {
    const meta = metaRouter()

    return {
      title:
        meta.title === defaultMeta.title
          ? defaultMeta.title
          : `${meta.title} | ${defaultMeta.title}`,
      description: meta.description ?? defaultMeta.description,
    }
  }, [metaRouter, defaultMeta.title, defaultMeta.description])

  return {
    getMeta,
  }
}
