import { Grid } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { natureDataState, pokemonDataState } from '@/store'
import { Nature, PokemonData } from '@/types'
import { SearchField } from '@/components/molecules/SearchField'
import { LvField } from './LvField'

type Props = {
  selectedPokemon: PokemonData
  selectedNature: Nature
  level: number | ''
  updatePokemon: (pokemon: PokemonData) => void
  updateNature: (nature: Nature) => void
  updateLevel: (level: number | '') => void
}

export const StatsTableHeader = (props: Props) => {
  const { selectedPokemon, selectedNature, level, updatePokemon, updateNature, updateLevel } = props
  const pokemonData = useRecoilValue(pokemonDataState)
  const natureData = useRecoilValue(natureDataState)

  const onChangeSelectedPokemon = (value: PokemonData | null) => {
    if (value === null) return
    updatePokemon(value)
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
        selectedItem={selectedPokemon}
      />
      <Grid container sx={{ pt: 2 }}>
        <Grid item xs={4}>
          <LvField level={level} updateLevel={updateLevel} />
        </Grid>
        <Grid item xs={8} sx={{ pl: 3 }}>
          <SearchField
            options={natureData}
            label="性格"
            itemName="性格"
            setState={onChangeSelectedNature}
            selectedItem={selectedNature}
            disableClearable={true}
          />
        </Grid>
      </Grid>
    </>
  )
}
