import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://pokemonote.com',
      lastModified: new Date(),
    },
    {
      url: 'https://pokemonote.com/pokemons',
      lastModified: new Date(),
    },
    {
      url: 'https://pokemonote.com/calc-stats',
      lastModified: new Date(),
    },
    {
      url: 'https://pokemonote.com/calc-speed',
      lastModified: new Date(),
    },
    {
      url: 'https://pokemonote.com/base-stats-ranking',
      lastModified: new Date(),
    },
  ]
}
