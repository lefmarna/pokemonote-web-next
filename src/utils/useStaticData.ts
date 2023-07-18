import axios from 'axios'
import type { PokemonBasicInfo } from '@/types'

export const fetchPokemonBasicInfoList = async () => {
  const response = await axios.get<{ data: PokemonBasicInfo[] }>(
    '/static/pokemon-data'
  )
  return response.data.data
}
