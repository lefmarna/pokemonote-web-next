import { PokemonBasicInfo } from '@/types'
import axios from 'axios'

export const fetchPokemonBasicInfoList = async () => {
  const response = await axios.get<{ data: PokemonBasicInfo[] }>('/static/pokemon-data')
  return response.data.data
}
