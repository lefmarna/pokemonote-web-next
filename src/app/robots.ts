import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: [
        '/email/',
        '/give-tip/',
        '/lefmarna-otoiawase/',
        '/password/',
        '/privacy-policy',
        '/settings/',
        '/users/',
      ],
    },
    sitemap: 'https://pokemonote.com/sitemap.xml',
  }
}
