import React, { useState } from 'react'
import {
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  ATTACK_INDEX,
  DEFENCE_INDEX,
  HP_INDEX,
  RANKS,
  SPEED_INDEX,
  SP_ATTACK_INDEX,
  SP_DEFENCE_INDEX,
} from '@/utils/constants'
import { PokemonData } from '@/types'
import { useMediaQueryDown } from '@/utils/theme'
import { useRecoilValue } from 'recoil'
import { pokemonDataState } from '@/store'

const EnhancedCheckbox = styled(Checkbox)({
  paddingTop: 0,
  paddingBottom: 0,
})

export default function BaseStatsRanking() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value)
    setPage(0)
  }

  const [isNotShowStats, setIsNotShowStats] = useState({
    attack: false,
    spAttack: false,
    speed: false,
  })

  const handleCheckboxChange = (event) => {
    setIsNotShowStats({ ...isNotShowStats, [event.target.name]: event.target.checked })
  }

  const [isShowRanks, setIsShowRanks] = useState({
    legendary: false,
    mythical: false,
    mega: false,
    sv: false,
  })

  const handleRankChange = (event) => {
    setIsShowRanks({ ...isShowRanks, [event.target.name]: event.target.checked })
  }

  const ranksCheckboxes = [
    { text: '伝説', value: 'legendary' },
    { text: '幻', value: 'mythical' },
    { text: 'メガシンカ', value: 'mega' },
    { text: 'SVに登場しないポケモン', value: 'sv' },
  ]

  const statsCheckboxes = [
    { text: '攻撃', value: 'attack' },
    { text: '特攻', value: 'spAttack' },
    { text: '素早さ', value: 'speed' },
  ]

  const pokemonData = useRecoilValue(pokemonDataState)
  const isXs = useMediaQueryDown('xs')

  // v-data-tableに表示させる内容とオプションの設定
  const headers = [
    { text: 'ポケモン名', value: 'name', align: 'left', width: '30%' },
    { text: 'ＨＰ', value: `stats[${HP_INDEX}]`, align: 'right', width: '10%' },
    { text: '攻撃', value: `stats[${ATTACK_INDEX}]`, align: 'right', width: '10%' },
    { text: '防御', value: `stats[${DEFENCE_INDEX}]`, align: 'right', width: '10%' },
    { text: '特攻', value: `stats[${SP_ATTACK_INDEX}]`, align: 'right', width: '10%' },
    { text: '特防', value: `stats[${SP_DEFENCE_INDEX}]`, align: 'right', width: '10%' },
    { text: '素早', value: `stats[${SPEED_INDEX}]`, align: 'right', width: '10%' },
    { text: '合計', value: 'total', align: 'right', width: '10%' },
  ]

  const filteredHeaders = headers.filter((header) => {
    if (header.text === '攻撃') return !isNotShowStats.attack
    if (header.text === '特攻') return !isNotShowStats.spAttack
    if (header.text === '素早さ') return !isNotShowStats.speed
    return true
  })

  const calculateTotalStats = (pokemon: PokemonData) =>
    pokemon.stats.reduce((sum, value, index) => {
      if (isNotShowStats.attack && index === ATTACK_INDEX) return sum
      if (isNotShowStats.spAttack && index === SP_ATTACK_INDEX) return sum
      if (isNotShowStats.speed && index === SPEED_INDEX) return sum
      return sum + value
    }, 0)

  const applyRankFilters = (pokemonData: PokemonData[]) =>
    pokemonData
      .filter((pokemon) => isShowRanks.mega || !pokemon.ranks.includes('mega'))
      .filter((pokemon) => isShowRanks.legendary || !pokemon.ranks.includes('legendary'))
      .filter((pokemon) => isShowRanks.mythical || !pokemon.ranks.includes('mythical'))
      .filter((pokemon) => isShowRanks.sv || pokemon.ranks.includes('sv'))

  const pokemonListInTotal = () => {
    const filteredData = applyRankFilters(pokemonData)
    const updatedData = filteredData.map((pokemon) => ({
      ...pokemon,
      total: calculateTotalStats(pokemon),
    }))
    return updatedData
  }

  // 【特別なポケモンを表示する】のオンオフを切り替える
  const rankChange = (value: keyof typeof isShowRanks): void => {
    isShowRanks[value] = !isShowRanks[value]
  }

  // 【除外するステータス】のオンオフを切り替える
  const statsChange = (value: keyof typeof isNotShowStats): void => {
    isNotShowStats[value] = !isNotShowStats[value]
  }

  return (
    <Container>
      <div>{'種族値ランキング（ポケモンSV）'}</div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography>【特別なポケモンを表示する】</Typography>
          {/* <CheckboxGroup items={RANKS} state={isShowRanks} onChange={handleRankChange} />
          <Divider sx={{ mt: 2, mb: 2 }} /> */}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>【除外するステータス】</Typography>
          <div style={{ display: 'flex' }}>
            {statsCheckboxes.map((stats) => (
              <FormControlLabel
                key={stats.value}
                control={
                  <Checkbox
                  // checked={!isNotShowStats[stats.value]}
                  // onChange={() => statsChange(stats.value)}
                  />
                }
                label={stats.text}
              />
            ))}
          </div>
          {/* <CheckboxGroup items={STATS} state={isNotShowStats} onChange={handleStatsChange} /> */}
        </Grid>
        <Divider sx={{ display: { xs: 'block', md: 'none' } }} />
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                {filteredHeaders.map((header) => (
                  <TableCell key={header.value}>{header.text}</TableCell>
                ))}
              </TableHead>
              <TableBody>
                {pokemonListInTotal().map((pokemon) => (
                  <TableRow key={pokemon.name}>
                    <TableCell>{pokemon.name}</TableCell>
                    <TableCell>{pokemon.stats[HP_INDEX]}</TableCell>
                    <TableCell>{pokemon.stats[ATTACK_INDEX]}</TableCell>
                    <TableCell>{pokemon.stats[DEFENCE_INDEX]}</TableCell>
                    <TableCell>{pokemon.stats[SP_ATTACK_INDEX]}</TableCell>
                    <TableCell>{pokemon.stats[SP_DEFENCE_INDEX]}</TableCell>
                    <TableCell>{pokemon.stats[SPEED_INDEX]}</TableCell>
                    <TableCell>{pokemon.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TablePagination
                  rowsPerPageOptions={[20, 50, 100, -1]}
                  component="div"
                  count={pokemonListInTotal.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  )
}
