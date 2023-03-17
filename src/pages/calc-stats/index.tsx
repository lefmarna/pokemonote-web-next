import { NextPage } from 'next'
import { CalcStatsTemplate } from '@/components/templates/CalcStatsTemplate'
import { useStatsMutators, useStatsState } from '@/store/statsState'
import { useLevelMutators, useLevelState } from '@/store/levelState'
import { useSelectedNatureMutators, useSelectedNatureState } from '@/store/selectedNatureState'
import { useSelectedPokemonMutators, useSelectedPokemonState } from '@/store/selectedPokemonState'

const CalcStats: NextPage = () => {
  const selectedPokemon = useSelectedPokemonState()
  const { updateSelectedPokemon } = useSelectedPokemonMutators()

  const selectedNature = useSelectedNatureState()
  const { updateSelectedNature } = useSelectedNatureMutators()

  const level = useLevelState()
  const { updateLevel } = useLevelMutators()

  const stats = useStatsState()
  const { updateStats } = useStatsMutators()

  return (
    <CalcStatsTemplate
      buttonText="投稿する"
      selectedPokemon={selectedPokemon}
      selectedNature={selectedNature}
      level={level}
      stats={stats}
      updatePokemon={updateSelectedPokemon}
      updateNature={updateSelectedNature}
      updateLevel={updateLevel}
      updateStats={updateStats}
    />
  )
}

export default CalcStats
