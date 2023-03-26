import React, { ChangeEvent, useState } from 'react'
import {
  Container,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  TablePagination,
} from '@mui/material'
import { PokemonData, RankCheckbox } from '@/types/index'
import {
  ATTACK_INDEX,
  DEFENCE_INDEX,
  HP_INDEX,
  SPEED_INDEX,
  SP_ATTACK_INDEX,
  SP_DEFENCE_INDEX,
} from '@/utils/constants'
import { useRecoilValue } from 'recoil'
import { pokemonDataState } from '@/store'
import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid'

export default function BaseStatsRanking() {
  // updateMeta(
  //   '種族値ランキング',
  //   'ポケモンSVの種族値ランキングです。攻撃や特攻、素早さを除いた実質種族値でのリストアップも可能です。伝説や幻のポケモンを表示するオプション、各種ステータスでソートする機能にも対応しています。準伝や600属の暴れる環境で、採用するポケモンに迷った際には、きっとこのツールが役立つことでしょう。'
  // );

  const pokemonList = useRecoilValue(pokemonDataState)

  // 【特別なポケモンを表示する】
  const [isShowRanks, setIsShowRanks] = useState({
    legendary: false,
    mythical: false,
    mega: false,
    sv: false,
  })

  // 【除外するステータス】
  const [isNotShowStats, setIsNotShowStats] = useState({
    attack: false,
    spAttack: false,
    speed: false,
  })

  const statsCheckboxes = [
    { text: '攻撃', value: 'attack' },
    { text: '特攻', value: 'spAttack' },
    { text: '素早さ', value: 'speed' },
  ]

  const ranksCheckboxes: RankCheckbox[] = [
    { text: '伝説', value: 'legendary' },
    { text: '幻', value: 'mythical' },
    { text: 'メガシンカ', value: 'mega' },
    { text: 'SVに登場しないポケモン', value: 'sv' },
  ]

  const filteredPokemonList = () => {
    // チェックボックスがオフになっているランクをexcludeRanks配列に追加
    const excludeRanks = ranksCheckboxes
      .filter((checkbox) => !isShowRanks[checkbox.value])
      .map((checkbox) => checkbox.value)

    // pokemonListをフィルタリングして、excludeRanksに含まれるランクを除外
    return pokemonList.filter((pokemon) =>
      excludeRanks.every((excludeRank) => {
        if (excludeRank === 'sv') return pokemon.ranks.includes(excludeRank)
        return !pokemon.ranks.includes(excludeRank)
      })
    )
  }

  // 【特別なポケモンを表示する】のオンオフを切り替える
  const rankChange = (value: keyof typeof isShowRanks): void => {
    setIsShowRanks({ ...isShowRanks, [value]: !isShowRanks[value] })
  }

  // 【除外するステータス】のオンオフを切り替える
  const statsChange = (value: keyof typeof isNotShowStats): void => {
    setIsNotShowStats({ ...isNotShowStats, [value]: !isNotShowStats[value] })
  }

  // DataGridに表示させる内容とオプションの設定
  const columns = [
    { field: 'name', headerName: 'ポケモン名', minWidth: 150 },
    {
      field: 'hp',
      headerName: 'ＨＰ',
      type: 'number',
      minWidth: 100,
      valueGetter: (params: GridValueGetterParams<PokemonData>) => params.row.stats[HP_INDEX],
    },
    {
      field: 'attack',
      headerName: '攻撃',
      type: 'number',
      minWidth: 100,
      valueGetter: (params: GridValueGetterParams<PokemonData>) => {
        return isNotShowStats.attack ? '' : params.row.stats[ATTACK_INDEX]
      },
    },
    {
      field: 'defence',
      headerName: '防御',
      type: 'number',
      minWidth: 100,
      valueGetter: (params: GridValueGetterParams<PokemonData>) => params.row.stats[DEFENCE_INDEX],
    },
    {
      field: 'sp_attack',
      headerName: '特攻',
      type: 'number',
      minWidth: 100,
      valueGetter: (params: GridValueGetterParams<PokemonData>) => {
        return isNotShowStats.spAttack ? '' : params.row.stats[SP_ATTACK_INDEX]
      },
    },
    {
      field: 'sp_defence',
      headerName: '特防',
      type: 'number',
      minWidth: 100,
      valueGetter: (params: GridValueGetterParams<PokemonData>) =>
        params.row.stats[SP_DEFENCE_INDEX],
    },
    {
      field: 'speed',
      headerName: '素早',
      type: 'number',
      minWidth: 100,
      valueGetter: (params: GridValueGetterParams<PokemonData>) => {
        return isNotShowStats.speed ? '' : params.row.stats[SPEED_INDEX]
      },
    },
    {
      field: 'total',
      headerName: '合計',
      type: 'number',
      minWidth: 100,
      valueGetter: (params: GridValueGetterParams<PokemonData>) =>
        calcBaseStatsTotal(params.row.stats),
    },
  ]

  /**
   * ポケモンの種族値の合計を計算する
   */
  const calcBaseStatsTotal = (stats: number[]) => {
    return stats.reduce((sum, value, index) => {
      if (isNotShowStats.attack && index === ATTACK_INDEX) return sum
      if (isNotShowStats.spAttack && index === SP_ATTACK_INDEX) return sum
      if (isNotShowStats.speed && index === SPEED_INDEX) return sum
      sum += value
      return sum
    }, 0)
  }

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)

  const handlePageChange = (params: any) => {
    setPage(params.page)
  }

  const handlePageSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const getRowId = (row: PokemonData) => row.name

  return (
    <Container>
      <Typography variant="h4">種族値ランキング</Typography>
      <Typography variant="h4">種族値ランキング（ポケモンSV）</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">【特別なポケモンを表示する】</Typography>
          {/* <FormGroup row> */}
          {ranksCheckboxes.map((rank) => (
            <FormControlLabel
              key={rank.value}
              control={
                <Checkbox
                  checked={isShowRanks[rank.value]}
                  onChange={() => rankChange(rank.value)}
                  name={rank.value}
                />
              }
              label={rank.text}
            />
          ))}
          {/* </FormGroup> */}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">【除外するステータス】</Typography>
          {/* <FormGroup row> */}
          {statsCheckboxes.map((stats) => (
            <FormControlLabel
              key={stats.value}
              control={
                <Checkbox
                  checked={isNotShowStats[stats.value as keyof typeof isNotShowStats]}
                  onChange={() => statsChange(stats.value as keyof typeof isNotShowStats)}
                  name={stats.value}
                />
              }
              label={stats.text}
            />
          ))}
          {/* </FormGroup> */}
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            columns={columns}
            getRowId={getRowId}
            rows={filteredPokemonList()}
            autoPageSize
            sortingOrder={['desc', 'asc']}
          />
          <TablePagination
            component="div"
            count={filteredPokemonList().length}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handlePageSizeChange}
            rowsPerPageOptions={[20, 50, 100]}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
