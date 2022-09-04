import { Grid } from '@mui/material'
import { SyntheticEvent } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  natureDataState,
  pokemonDataState,
  selectedNatureState,
  selectedPokemonState,
} from '../../store'
import { Nature, PokemonData } from '../../types'
import { SearchField } from '../molecules/SearchField'
import { LvField } from './LvField'

type Props = {
  level: number | ''
  updateLevel: (level: number | '') => void
}

export const StatsTableHeader = (props: Props) => {
  const { level, updateLevel } = props
  const pokemonData = useRecoilValue(pokemonDataState)
  const natureData = useRecoilValue(natureDataState)

  const [selectedPokemon, setSelectedPokemon] = useRecoilState(selectedPokemonState)
  const [selectedNature, setSelectedNature] = useRecoilState(selectedNatureState)

  const onChangeSelectedPokemon = (
    event: SyntheticEvent<Element, Event>,
    value: PokemonData | null
  ) => {
    if (value === null) return
    setSelectedPokemon(value)
  }

  const onChangeSelectedNature = (event: SyntheticEvent<Element, Event>, value: Nature | null) => {
    if (value === null) return
    setSelectedNature(value)
  }

  return (
    <>
      <SearchField
        options={pokemonData}
        label="ポケモン名"
        itemName="ポケモン"
        onChange={onChangeSelectedPokemon}
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
            onChange={onChangeSelectedNature}
            selectedItem={selectedNature}
            disableClearable={true}
          />
        </Grid>
      </Grid>
    </>
  )
}
