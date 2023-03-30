import Head from 'next/head'

type Props = {
  title: string
  metaDescription?: string
}

export const Meta = (props: Props) => {
  const {
    title,
    metaDescription = 'ポケモンのステータスを計算・管理するためのWebアプリ『Pokemonote』へようこそ！ 素早さ計算機やSVに対応した種族値ランキングといったツールも公開しています。「シンプルで高機能」なツールにこだわって制作していますので、是非お試しください。',
  } = props

  return (
    <Head>
      <title>{title ? `${title} | Pokemonote` : 'Pokemonote'}</title>
      <meta name="description" content={metaDescription} />
      <meta name="og:description" content={metaDescription} />
      <meta name="twitter:description" content={metaDescription} />
    </Head>
  )
}
