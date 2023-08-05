import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') {
    return {
      rules: {
        userAgent: '*',
        disallow: ['/'],
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      disallow: [
        '/email/',
        '/give-tip/',
        '/lefmarna-otoiawase/',
        '/password/',
        '/privacy-policy/',
        '/settings/',
        '/users/',
      ],
    },
    sitemap: 'https://pokemonote.com/sitemap.xml',
  }
}
