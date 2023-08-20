import { $axios } from '@/libs/axios'
import type { PokemonBasicInfo } from '@/types/front'

export const fetchPokemonBasicInfoList = async () => {
  const response = await $axios.get<{ data: PokemonBasicInfo[] }>(
    '/api/v2/static/pokemon-data'
  )
  return response.data.data
}
