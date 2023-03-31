import Head from 'next/head'

type Props = {
  title: string
  metaDescription?: string
}

export const Meta = (props: Props) => {
  const { title, metaDescription } = props

  return (
    <Head>
      <title>{title ? `${title} | Pokemonote` : 'Pokemonote'}</title>
      {metaDescription && (
        <>
          <meta name="description" content={metaDescription} />
          <meta name="og:description" content={metaDescription} />
          <meta name="twitter:description" content={metaDescription} />
        </>
      )}
    </Head>
  )
}
