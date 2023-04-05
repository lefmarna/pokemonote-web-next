import { Nature, PokemonData } from '@/types'
import axios from 'axios'

export const fetchPokemonData = async () => {
  const response = await axios.get<{ data: PokemonData[] }>('/static/pokemon-data')
  return response.data.data
}

export const fetchNatureData = async () => {
  const response = await axios.get<{ data: Nature[] }>('/static/nature-data')
  return response.data.data
}
