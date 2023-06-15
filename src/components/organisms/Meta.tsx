import Head from 'next/head'

type Props = {
  title: string
  metaDescription?: string
}

const Meta = (props: Props) => {
  const { title, metaDescription } = props

  const titleWithSiteName = `${title} | Pokemonote`

  return (
    <Head>
      <title>{titleWithSiteName}</title>
      <meta property="og:title" content={titleWithSiteName} />
      <meta property="twitter:title" content={titleWithSiteName} />
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

export default Meta
