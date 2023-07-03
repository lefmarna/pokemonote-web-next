import Head from 'next/head'

type Props = {
  title: string
  metaDescription?: string
}

export const Meta = (props: Props) => {
  const { title, metaDescription } = props

  const titleWithSiteName = `${title} | Pokemonote`

  return (
    <Head>
      <title>{titleWithSiteName}</title>
      <meta property="og:title" content={titleWithSiteName} />
      <meta property="twitter:title" content={titleWithSiteName} />
      {metaDescription && (
        <>
          <meta property="description" content={metaDescription} />
          <meta property="og:description" content={metaDescription} />
          <meta property="twitter:description" content={metaDescription} />
        </>
      )}
    </Head>
  )
}
