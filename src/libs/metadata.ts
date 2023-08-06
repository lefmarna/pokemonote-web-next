import type { Metadata } from 'next'

export const DEFAULT_META_TITLE = 'Pokemonote'
export const DEFAULT_META_DESCRIPTION =
  'ポケモンのステータスを計算・管理するためのWebアプリ『Pokemonote』へようこそ！ 素早さ計算機やSVに対応した種族値ランキングといったツールも公開しています。「シンプルで高機能」なツールにこだわって制作していますので、是非お試しください。'

export const getMetadata = (
  title: string,
  description: string = DEFAULT_META_DESCRIPTION
): Metadata => {
  return {
    title,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
    description,
  }
}
