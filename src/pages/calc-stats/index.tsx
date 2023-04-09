import { NextPage } from 'next'
import { CalcStatsTemplate } from '@/components/templates/CalcStatsTemplate'
import { usePokemonMutators, usePokemonState } from '@/store/pokemonState'

const CalcStats: NextPage = () => {
  const pokemon = usePokemonState()
  const { updateBasicInfo, updateNature, updateLevel, updateIvs, updateEvs } = usePokemonMutators()

  return (
    <CalcStatsTemplate
      buttonText="投稿する"
      pokemon={pokemon}
      updateBasicInfo={updateBasicInfo}
      updateNature={updateNature}
      updateLevel={updateLevel}
      updateIvs={updateIvs}
      updateEvs={updateEvs}
    />
  )
}

export default CalcStats
