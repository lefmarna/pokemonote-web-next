'use client'

import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
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
import type { SelectChangeEvent } from '@mui/material'
import type { ChangeEvent } from 'react'

export const CalcSpeed = () => {
  const pokemon = usePokemonState()
  const [option, setOption] = useState(false)

  const [isTailwind, setIsTailwind] = useState(false)
  const [isParalysis, setIsParalysis] = useState(false)
  const [isSwampyField, setIsSwampyField] = useState(false)
  const [selectItem, setSelectItem] = useState(10)
  const [selectAbility, setSelectAbility] = useState(10)

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

  /**
   * 素早さリストに表示する値を計算する
   */
  const calcSpeed = (percent: number) => {
    const tailwind = isTailwind ? 2 : 1
    const paralysis = isParalysis ? 5 : 10
    const swampyField = isSwampyField ? 25 : 100

    // 特性が「はやあし・かるわざ」のときは計算の順番を変える
    if (selectAbility === 2) {
      return Math.floor(
        (Math.floor(
          (Math.floor((calcBaseSpeed(percent) * selectItem) / 10) * paralysis) /
            10
        ) *
          2 *
          tailwind *
          swampyField) /
          100
      )
      // 特性がその他であれば通常通り計算する
    } else {
      return Math.floor(
        (Math.floor(
          (Math.floor(
            (Math.floor((calcBaseSpeed(percent) * selectAbility) / 10) *
              selectItem) /
              10
          ) *
            paralysis) /
            10
        ) *
          tailwind *
          swampyField) /
          100
      )
    }
  }

  const displaySpeed = (percent: number) => {
    return `${calcBaseSpeed(percent)} (${calcSpeed(percent)})`
  }

  const SPEED_ITEMS = [
    { name: 'スピードパウダー (×2)', value: 20 },
    { name: 'こだわりスカーフ (×1.5)', value: 15 },
    { name: '--- 道具を選択 ---', value: 10 },
    { name: 'くろいてっきゅう (×0.5)', value: 5 },
  ]

  const SPEED_ABILITIES = [
    { name: 'すいすい・ようりょくそ (×2)', value: 20 },
    { name: 'はやあし・かるわざ (×2)', value: 2 },
    { name: '--- 特性を選択 ---', value: 10 },
    { name: 'スロースタート (×0.5)', value: 5 },
  ]

  const handleChangeSelectItem = (event: SelectChangeEvent<number>) => {
    setSelectItem(Number(event.target.value))
  }

  const handleChangeSelectAbility = (event: SelectChangeEvent<number>) => {
    setSelectAbility(Number(event.target.value))
  }

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.checked)
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
            <div>
              <div>
                <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
                  <InputLabel>道具</InputLabel>
                  <Select value={selectItem} onChange={handleChangeSelectItem}>
                    {SPEED_ITEMS.map((item) => (
                      <MenuItem key={item.name} value={item.value}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
                  <InputLabel>特性</InputLabel>
                  <Select
                    value={selectAbility}
                    onChange={handleChangeSelectAbility}
                  >
                    {SPEED_ABILITIES.map((item) => (
                      <MenuItem key={item.name} value={item.value}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <Box sx={{ my: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={isTailwind}
                      onChange={(e) => setIsTailwind(e.target.checked)}
                    />
                  }
                  label="おいかぜ (×2.0)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value={isParalysis}
                      onChange={(e) => setIsParalysis(e.target.checked)}
                    />
                  }
                  label="まひ (×0.5)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value={isSwampyField}
                      onChange={(e) => setIsSwampyField(e.target.checked)}
                    />
                  }
                  label="湿原 (×0.25)"
                />
              </Box>

              <p>オプション</p>
              <FormControlLabel
                control={
                  <Switch checked={option} onChange={handleOptionChange} />
                }
                label="±4以上も表示する"
              />
            </div>
          </Grid>
          {/* 画面右 */}
          <Grid
            item
            md={9}
            xs={18}
            sx={{
              mr: { xs: 1, md: 0 },
              my: { xs: 2, sm: 2, md: 0, lg: 0, xl: 0 },
            }}
          >
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
                      {displaySpeed(rank.percent)}
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
