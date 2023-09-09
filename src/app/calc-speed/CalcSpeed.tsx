'use client'

import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { useState } from 'react'
import { Title } from '@/components/molecules/Title'
import { BaseStatsField } from '@/components/organisms/BaseStatsField'
import { EffortValueField } from '@/components/organisms/EffortValueField'
import { IndividualValueField } from '@/components/organisms/IndividualValueField'
import { RealNumberField } from '@/components/organisms/RealNumberField'
import { StatsTableHeader } from '@/components/organisms/StatsTableHeader'
import { usePokemonStats } from '@/hooks/usePokemonStats'
import { usePokemonMutators } from '@/store/pokemonState'
import { usePokemonState } from '@/store/pokemonState'
import { RANKS } from '@/utils/constants'
import type { StatsKey } from '@/types/front'

export const CalcSpeed = () => {
  const pokemon = usePokemonState()
  const [option, setOption] = useState(false)

  const { updateBasicInfo, updateNature, updateLevel, updateIvs, updateEvs } =
    usePokemonMutators()

  const { realNumbers, getEv, getNatureModifier, getStatsInitial } =
    usePokemonStats(pokemon)

  const updateRealNumber = (
    newRealNumber: number | null,
    statKey: StatsKey
  ) => {
    const newEv = getEv(newRealNumber, statKey)

    updateEvs({ [statKey]: newEv })
  }

  const filteredRanks = () => {
    if (option === true) return RANKS
    return RANKS.filter((rank) => Math.abs(rank.magnification) <= 3)
  }

  const formatRank = (magnification: number): string => {
    if (magnification > 0) return `+${magnification}`
    if (magnification === 0) return `±${magnification}`
    return String(magnification)
  }

  const calcBaseSpeed = (percent: number) => {
    return Math.floor((realNumbers.speed * percent) / 100)
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
          {/* 画面右 */}
          <Grid item md={9} xs={18} sx={{ mr: { xs: 1, md: 0 } }}>
            <Table style={{ width: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ランク</TableCell>
                  <TableCell align="center">素早さ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRanks().map((rank) => (
                  <TableRow key={rank.id}>
                    <TableCell align="center">
                      {formatRank(rank.magnification)}
                    </TableCell>
                    <TableCell align="center">
                      {calcBaseSpeed(rank.percent)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
