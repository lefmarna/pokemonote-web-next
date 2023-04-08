import { NextPage } from 'next'
import { CalcStatsTemplate } from '@/components/templates/CalcStatsTemplate'
import { fetchPokemonBasicInfoList } from '@/utils/useStaticData'
import { PokemonBasicInfo } from '@/types'
import { usePokemonMutators, usePokemonState } from '@/store/pokemonState'

export async function getStaticProps() {
  const pokemonBasicInfoList = await fetchPokemonBasicInfoList()
  return {
    props: {
      pokemonBasicInfoList,
    },
  }
}

const CalcStats: NextPage<{ pokemonBasicInfoList: PokemonBasicInfo[] }> = ({
  pokemonBasicInfoList,
}) => {
  const pokemon = usePokemonState()
  const { updateBasicInfo, updateNature, updateLevel, updateIvs, updateEvs } = usePokemonMutators()

  return (
    <CalcStatsTemplate
      buttonText="投稿する"
      pokemonBasicInfoList={pokemonBasicInfoList}
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
