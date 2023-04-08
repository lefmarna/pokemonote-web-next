import { Grid } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { natureDataState, pokemonDataState } from '@/store'
import { Nature, Pokemon, PokemonBasicInfo } from '@/types'
import { SearchField } from '@/components/molecules/SearchField'
import { LvField } from './LvField'

type Props = {
  pokemon: Pokemon
  updateBasicInfo: (pokemon: PokemonBasicInfo) => void
  updateNature: (nature: Nature) => void
  updateLevel: (level: number | '') => void
}

export const StatsTableHeader = (props: Props) => {
  const { pokemon, updateBasicInfo, updateNature, updateLevel } = props
  const pokemonData = useRecoilValue(pokemonDataState)
  const natureData = useRecoilValue(natureDataState)

  const onChangeSelectedPokemon = (value: PokemonBasicInfo | null) => {
    if (value === null) return
    updateBasicInfo(value)
  }

  const onChangeSelectedNature = (value: Nature | null) => {
    if (value === null) return
    updateNature(value)
  }

  return (
    <>
      <SearchField
        options={pokemonData}
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
            options={natureData}
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
