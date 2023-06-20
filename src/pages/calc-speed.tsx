import { Title } from '@/components/molecules/Title'
import { BaseStatsField } from '@/components/organisms/BaseStatsField'
import { EffortValueField } from '@/components/organisms/EffortValueField'
import { IndividualValueField } from '@/components/organisms/IndividualValueField'
import { RealNumberField } from '@/components/organisms/RealNumberField'
import { StatsTableHeader } from '@/components/organisms/StatsTableHeader'
import { usePokemonStats } from '@/hooks/usePokemonStats'
import { usePokemonMutators } from '@/store/pokemonState'
import { usePokemonState } from '@/store/pokemonState'
import { StatsKey } from '@/types'
import { Container, Grid } from '@mui/material'

export default function CalcSpeed() {
  const pokemon = usePokemonState()

  console.log(aaa)

  const { updateBasicInfo, updateNature, updateLevel, updateIvs, updateEvs } =
    usePokemonMutators()

  const { realNumbers, getEv, getNatureModifier, getStatsInitial } =
    usePokemonStats(pokemon)

  const updateRealNumber = (newRealNumber: number | '', statKey: StatsKey) => {
    const newEv = getEv(newRealNumber, statKey)

    updateEvs({ [statKey]: newEv })
  }

  return (
    <>
      <Container sx={{ py: 2, px: 1.5 }}>
        <Title text="素早さ計算機（ポケモンSV）" />
        <Grid
          container
          spacing={{ md: 4, lg: 8, xl: 12 }}
          columns={{ xs: 9, md: 18 }}
        >
          {/* 画面左 */}
          <Grid item md={9} xs={18} sx={{ mr: { xs: 1, md: 0 } }}>
            <StatsTableHeader
              basicInfo={pokemon.basicInfo}
              nature={pokemon.nature}
              level={pokemon.level}
              updateBasicInfo={updateBasicInfo}
              updateNature={updateNature}
              updateLevel={updateLevel}
            />
            <Grid container columns={256} sx={{ mt: 2 }}>
              <BaseStatsField
                value={pokemon.basicInfo.baseStats.speed}
                statsInitial={getStatsInitial('speed')}
                natureStat={getNatureModifier('speed', pokemon.nature)}
              />
              <IndividualValueField
                value={pokemon.ivs.speed}
                statKey={'speed'}
                updateIvs={updateIvs}
              />
              <EffortValueField
                value={pokemon.evs.speed}
                statKey={'speed'}
                updateEvs={updateEvs}
              />
              <RealNumberField
                value={realNumbers.speed}
                statKey={'speed'}
                updateRealNumber={updateRealNumber}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
