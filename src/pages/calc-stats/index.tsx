import { NextPage } from 'next'
import { useRecoilState } from 'recoil'
import { CalcStatsTemplate } from '@/components/templates/CalcStatsTemplate'
import { levelState, selectedNatureState, selectedPokemonState } from '@/store'
import { Nature, PokemonData } from '@/types'
import { useStatsMutators, useStatsState } from '@/store/statsState'

const CalcStats: NextPage = () => {
  const [selectedPokemon, setSelectedPokemon] = useRecoilState(selectedPokemonState)
  const [selectedNature, setSelectedNature] = useRecoilState(selectedNatureState)
  const [level, setLevel] = useRecoilState(levelState)

  const stats = useStatsState()
  const { updateStats } = useStatsMutators()

  const updatePokemon = (pokemon: PokemonData) => {
    setSelectedPokemon(pokemon)
  }
  const updateNature = (nature: Nature) => {
    setSelectedNature(nature)
  }

  const updateLevel = (level: number | '') => {
    setLevel(level)
  }

  return (
    <CalcStatsTemplate
      buttonText="投稿する"
      selectedPokemon={selectedPokemon}
      selectedNature={selectedNature}
      level={level}
      stats={stats}
      updatePokemon={updatePokemon}
      updateNature={updateNature}
      updateLevel={updateLevel}
      updateStats={updateStats}
    />
  )
}

export default CalcStats
