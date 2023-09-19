'use client'

import {
  Container,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material'
import {
  DataGrid,
  GridToolbar,
  getGridNumericOperators,
  getGridStringOperators,
  jaJP,
} from '@mui/x-data-grid'
import React, { useMemo, useState } from 'react'
import { Title } from '@/components/molecules/Title'
import { useMediaQueryDown } from '@/hooks/style/useMediaQueries'
import { usePokemonBasicInfosState } from '@/store/pokemonBasicInfosState'
import type { RankCheckbox, Stats } from '@/types/front'
import type { PokemonBasicInfo } from '@/types/openapi/schemas'
import type { GridSortModel, GridValueGetterParams } from '@mui/x-data-grid'

export const BaseStatsRanking = () => {
  const pokemonBasicInfos = usePokemonBasicInfosState()

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

  const ranksCheckboxes: RankCheckbox[] = useMemo(
    () => [
      { text: '伝説', value: 'legendary' },
      { text: '幻', value: 'mythical' },
      { text: 'メガシンカ', value: 'mega' },
      { text: 'SVに登場しないポケモン', value: 'sv' },
    ],
    []
  )

  const filteredPokemonList = useMemo(() => {
    return pokemonBasicInfos.filter((pokemon) =>
      ranksCheckboxes.every((checkbox) => {
        if (isShowRanks[checkbox.value]) return true
        if (checkbox.value !== 'sv')
          return !pokemon.ranks.includes(checkbox.value)
        return pokemon.ranks.includes(checkbox.value)
      })
    )
  }, [isShowRanks, pokemonBasicInfos, ranksCheckboxes])

  // 【特別なポケモンを表示する】のオンオフを切り替える
  const rankChange = (value: keyof typeof isShowRanks): void => {
    setIsShowRanks({ ...isShowRanks, [value]: !isShowRanks[value] })
  }

  // 【除外するステータス】のオンオフを切り替える
  const statsChange = (value: keyof typeof isNotShowStats): void => {
    setIsNotShowStats({ ...isNotShowStats, [value]: !isNotShowStats[value] })
  }

  // DataGridにおけるフィルターの要素を絞り込む（type: string）
  const filterStringOperators = getGridStringOperators().filter((operator) => {
    return operator.value === 'contains'
  })

  // DataGridにおけるフィルターの要素を絞り込む(type: number)
  const filterNumericOperators = getGridNumericOperators().filter(
    (operator) => {
      return (
        operator.value === '=' ||
        operator.value === '>=' ||
        operator.value === '<='
      )
    }
  )

  const isSmallDownScreen = useMediaQueryDown('sm')

  const statsWidth = isSmallDownScreen ? undefined : 115

  // DataGridに表示させる内容とオプションの設定
  const columns = [
    {
      field: 'name',
      headerName: 'ポケモン名',
      type: 'string',
      flex: 1,
      minWidth: 200,
      filterOperators: filterStringOperators,
    },
    {
      field: 'hp',
      headerName: 'ＨＰ',
      type: 'number',
      minWidth: statsWidth,
      valueGetter: (params: GridValueGetterParams<PokemonBasicInfo>) =>
        params.row.baseStats.hp,
      filterOperators: filterNumericOperators,
    },
    {
      field: 'attack',
      headerName: '攻撃',
      type: 'number',
      minWidth: statsWidth,
      valueGetter: (params: GridValueGetterParams<PokemonBasicInfo>) => {
        return isNotShowStats.attack ? '' : params.row.baseStats.attack
      },
      filterOperators: filterNumericOperators,
    },
    {
      field: 'defense',
      headerName: '防御',
      type: 'number',
      minWidth: statsWidth,
      filterOperators: filterNumericOperators,
      valueGetter: (params: GridValueGetterParams<PokemonBasicInfo>) =>
        params.row.baseStats.defense,
    },
    {
      field: 'spAttack',
      headerName: '特攻',
      type: 'number',
      minWidth: statsWidth,
      filterOperators: filterNumericOperators,
      valueGetter: (params: GridValueGetterParams<PokemonBasicInfo>) => {
        return isNotShowStats.spAttack ? '' : params.row.baseStats.spAttack
      },
    },
    {
      field: 'spDefense',
      headerName: '特防',
      type: 'number',
      minWidth: statsWidth,
      filterOperators: filterNumericOperators,
      valueGetter: (params: GridValueGetterParams<PokemonBasicInfo>) =>
        params.row.baseStats.spDefense,
    },
    {
      field: 'speed',
      headerName: '素早',
      type: 'number',
      minWidth: statsWidth,
      filterOperators: filterNumericOperators,
      valueGetter: (params: GridValueGetterParams<PokemonBasicInfo>) => {
        return isNotShowStats.speed ? '' : params.row.baseStats.speed
      },
    },
    {
      field: 'total',
      headerName: '合計',
      type: 'number',
      minWidth: statsWidth,
      cellClassName: 'pr-2',
      filterOperators: filterNumericOperators,
      valueGetter: (params: GridValueGetterParams<PokemonBasicInfo>) =>
        calcBaseStatsTotal(params.row.baseStats),
    },
  ]

  /**
   * ポケモンの種族値の合計を計算する
   */
  const calcBaseStatsTotal = (baseStats: Stats) => {
    return Object.entries(baseStats).reduce((sum, [key, value]) => {
      if (isNotShowStats.attack && key === 'attack') return sum
      if (isNotShowStats.spAttack && key === 'spAttack') return sum
      if (isNotShowStats.speed && key === 'speed') return sum
      return sum + value
    }, 0)
  }

  const getRowId = (row: PokemonBasicInfo) => row.name

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'total',
      sort: 'desc',
    },
  ])

  return (
    <Container>
      <Title text="種族値ランキング（ポケモンSV）" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">
            【特別なポケモンを表示する】
          </Typography>
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
          {isSmallDownScreen && <Divider />}
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
                  checked={
                    isNotShowStats[stats.value as keyof typeof isNotShowStats]
                  }
                  onChange={() =>
                    statsChange(stats.value as keyof typeof isNotShowStats)
                  }
                  name={stats.value}
                />
              }
              label={stats.text}
            />
          ))}
          {/* </FormGroup> */}
          {isSmallDownScreen && <Divider />}
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            columns={columns}
            getRowId={getRowId}
            rows={filteredPokemonList}
            sortingOrder={['desc', 'asc']}
            slots={{
              toolbar: GridToolbar,
            }}
            slotProps={{
              toolbar: {
                printOptions: {
                  disableToolbarButton: true,
                },
                csvOptions: {
                  disableToolbarButton: isSmallDownScreen,
                },
                showQuickFilter: true,
              },
            }}
            sx={{
              border: 'none',
              '& .pr-2': {
                pr: 2,
              },
              '& .MuiDataGrid-columnHeader': {
                pr: 2,
              },
              '& .MuiDataGrid-main': {
                boxShadow:
                  '0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)',
              },
              '& .MuiDataGrid-toolbarContainer': {
                mb: 2,
              },
              '& .MuiDataGrid-row:nth-of-type(odd)': {
                backgroundColor: '#F0F8FF',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              '& .MuiDataGrid-columnHeader:focus': {
                outline: 'none',
              },
              '& .MuiDataGrid-columnHeader:focus-within': {
                outline: 'none',
              },
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
              '& .MuiDataGrid-cell:focus-within': {
                outline: 'none',
              },
            }}
            disableColumnFilter={isSmallDownScreen}
            disableColumnMenu
            disableColumnSelector
            disableDensitySelector
            disableRowSelectionOnClick
            localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
