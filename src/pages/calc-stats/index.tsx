import { NextPage } from 'next'
import { useRecoilState } from 'recoil'
import { CalcStatsTemplate } from '@/components/templates/CalcStatsTemplate'
import { selectedNatureState, selectedPokemonState } from '@/store'
import { Nature, PokemonData } from '@/types'
import { useStatsMutators, useStatsState } from '@/store/statsState'
import { useLevelMutators, useLevelState } from '@/store/levelState'

const CalcStats: NextPage = () => {
  const [selectedPokemon, setSelectedPokemon] = useRecoilState(selectedPokemonState)
  const [selectedNature, setSelectedNature] = useRecoilState(selectedNatureState)

  const level = useLevelState()
  const { updateLevel } = useLevelMutators()

  const stats = useStatsState()
  const { updateStats } = useStatsMutators()

  const updatePokemon = (pokemon: PokemonData) => {
    setSelectedPokemon(pokemon)
  }
  const updateNature = (nature: Nature) => {
    setSelectedNature(nature)
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
