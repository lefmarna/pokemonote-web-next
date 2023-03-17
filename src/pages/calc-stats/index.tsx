import { NextPage } from 'next'
import { useRecoilState } from 'recoil'
import { CalcStatsTemplate } from '@/components/templates/CalcStatsTemplate'
import { selectedPokemonState } from '@/store'
import { PokemonData } from '@/types'
import { useStatsMutators, useStatsState } from '@/store/statsState'
import { useLevelMutators, useLevelState } from '@/store/levelState'
import { useSelectedNatureMutators, useSelectedNatureState } from '@/store/selectedNatureState'

const CalcStats: NextPage = () => {
  const [selectedPokemon, setSelectedPokemon] = useRecoilState(selectedPokemonState)

  const selectedNature = useSelectedNatureState()
  const { updateSelectedNature } = useSelectedNatureMutators()

  const level = useLevelState()
  const { updateLevel } = useLevelMutators()

  const stats = useStatsState()
  const { updateStats } = useStatsMutators()

  const updatePokemon = (pokemon: PokemonData) => {
    setSelectedPokemon(pokemon)
  }

  return (
    <CalcStatsTemplate
      buttonText="投稿する"
      selectedPokemon={selectedPokemon}
      selectedNature={selectedNature}
      level={level}
      stats={stats}
      updatePokemon={updatePokemon}
      updateNature={updateSelectedNature}
      updateLevel={updateLevel}
      updateStats={updateStats}
    />
  )
}

export default CalcStats
