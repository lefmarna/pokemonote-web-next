import { Grid } from '@mui/material'
import { Nature, Pokemon, PokemonBasicInfo } from '@/types'
import { SearchField } from '@/components/molecules/SearchField'
import { LvField } from './LvField'
import { usePokemonBasicInfosState } from '@/store/pokemonBasicInfosState'
import { useNaturesState } from '@/store/naturesState'
import { useCallback } from 'react'

type Props = {
  pokemon: Pokemon
  updateBasicInfo: (pokemon: PokemonBasicInfo) => void
  updateNature: (nature: Nature) => void
  updateLevel: (level: number | '') => void
}

export const StatsTableHeader = (props: Props) => {
  const { pokemon, updateBasicInfo, updateNature, updateLevel } = props
  const pokemonBasicInfos = usePokemonBasicInfosState()
  const natures = useNaturesState()

  const onChangeSelectedPokemon = useCallback(
    (newItem: PokemonBasicInfo | null) => {
      if (newItem === null) return
      updateBasicInfo(newItem)
    },
    [updateBasicInfo]
  )

  const onChangeSelectedNature = useCallback(
    (value: Nature | null) => {
      if (value === null) return
      updateNature(value)
    },
    [updateNature]
  )

  return (
    <>
      <SearchField
        options={pokemonBasicInfos}
        label="ポケモン名"
        itemName="ポケモン"
        setState={onChangeSelectedPokemon}
        selectedItem={pokemon.basicInfo}
      />
      <Grid container sx={{ pt: 2 }}>
        <Grid item xs={4}>
          <LvField level={pokemon.level} updateLevel={updateLevel} />
        </Grid>
        <Grid item xs={8} sx={{ pl: 3 }}>
          <SearchField
            options={natures}
            label="性格"
            itemName="性格"
            setState={onChangeSelectedNature}
            selectedItem={pokemon.nature}
            disableClearable={true}
          />
        </Grid>
      </Grid>
    </>
  )
}
