import { Grid } from '@mui/material'
import { memo, useCallback } from 'react'
import { LvField } from './LvField'
import { SearchField } from '@/components/molecules/SearchField'
import { useNaturesState } from '@/store/naturesState'
import { usePokemonBasicInfosState } from '@/store/pokemonBasicInfosState'
import type { Nature, PokemonBasicInfo } from '@/types'

type Props = {
  basicInfo: PokemonBasicInfo
  nature: Nature
  level: number | ''
  updateBasicInfo: (pokemon: PokemonBasicInfo) => void
  updateNature: (nature: Nature) => void
  updateLevel: (level: number | '') => void
}

export const StatsTableHeader = memo(function StatsTableHeader(props: Props) {
  const {
    basicInfo,
    nature,
    level,
    updateBasicInfo,
    updateNature,
    updateLevel,
  } = props
  const pokemonBasicInfos = usePokemonBasicInfosState()
  const natures = useNaturesState()

  const onChangePokemonBasicInfo = useCallback(
    (newItem: PokemonBasicInfo | null) => {
      if (newItem === null) return
      updateBasicInfo(newItem)
    },
    [updateBasicInfo]
  )

  const onChangeNature = useCallback(
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
        setState={onChangePokemonBasicInfo}
        selectedItem={basicInfo}
      />
      <Grid container sx={{ pt: 2 }}>
        <Grid item xs={4}>
          <LvField level={level} updateLevel={updateLevel} />
        </Grid>
        <Grid item xs={8} sx={{ pl: 3 }}>
          <SearchField
            options={natures}
            label="性格"
            itemName="性格"
            setState={onChangeNature}
            selectedItem={nature}
            disableClearable={true}
          />
        </Grid>
      </Grid>
    </>
  )
})
