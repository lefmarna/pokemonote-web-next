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
} from '@mui/x-data-grid'
import React, { useMemo, useState } from 'react'
import { Title } from '@/components/molecules/Title'
import { useMediaQueryDown } from '@/hooks/style/useMediaQueries'
import { usePokemonBasicInfosState } from '@/store/pokemonBasicInfosState'
import type { RankCheckbox, Stats } from '@/types/front'
import type { PokemonBasicInfo } from '@/types/openapi/schemas'
import type {
  GridSortModel,
  GridColDef,
  GridLocaleText,
} from '@mui/x-data-grid'

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
  const columns: GridColDef[] = [
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
      valueGetter: (_, pokemon: PokemonBasicInfo) => {
        return pokemon.baseStats.hp
      },
      filterOperators: filterNumericOperators,
    },
    {
      field: 'attack',
      headerName: '攻撃',
      type: 'number',
      minWidth: statsWidth,
      valueGetter: (_, pokemon: PokemonBasicInfo) => {
        return isNotShowStats.attack ? '' : pokemon.baseStats.attack
      },
      filterOperators: filterNumericOperators,
    },
    {
      field: 'defense',
      headerName: '防御',
      type: 'number',
      minWidth: statsWidth,
      filterOperators: filterNumericOperators,
      valueGetter: (_, pokemon: PokemonBasicInfo) => {
        return pokemon.baseStats.defense
      },
    },
    {
      field: 'spAttack',
      headerName: '特攻',
      type: 'number',
      minWidth: statsWidth,
      filterOperators: filterNumericOperators,
      valueGetter: (_, pokemon: PokemonBasicInfo) => {
        return isNotShowStats.spAttack ? '' : pokemon.baseStats.spAttack
      },
    },
    {
      field: 'spDefense',
      headerName: '特防',
      type: 'number',
      minWidth: statsWidth,
      filterOperators: filterNumericOperators,
      valueGetter: (_, pokemon: PokemonBasicInfo) => {
        return pokemon.baseStats.spDefense
      },
    },
    {
      field: 'speed',
      headerName: '素早',
      type: 'number',
      minWidth: statsWidth,
      filterOperators: filterNumericOperators,
      valueGetter: (_, pokemon: PokemonBasicInfo) => {
        return isNotShowStats.speed ? '' : pokemon.baseStats.speed
      },
    },
    {
      field: 'total',
      headerName: '合計',
      type: 'number',
      minWidth: statsWidth,
      cellClassName: 'pr-2',
      filterOperators: filterNumericOperators,
      valueGetter: (_, pokemon: PokemonBasicInfo) => {
        return calcBaseStatsTotal(pokemon.baseStats)
      },
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

  const localeText: Partial<GridLocaleText> = {
    noResultsOverlayLabel: 'ポケモンが見つかりませんでした。',
    // Quick filter toolbar field
    toolbarQuickFilterPlaceholder: 'ポケモン名で検索',

    // Filters toolbar button text
    toolbarFilters: '絞り込み',
    toolbarFiltersTooltipShow: '絞り込み条件を開く',

    // Export selector toolbar button text
    toolbarExport: 'ダウンロード',
    toolbarExportLabel: 'ダウンロード条件を開く',
    toolbarExportCSV: 'CSV形式でダウンロードする',
    toolbarExportExcel: 'Excel形式でダウンロードする',

    // Filter panel text
    // filterPanelAddFilter: 'Add filter',
    // filterPanelRemoveAll: 'Remove all',
    filterPanelDeleteIconLabel: '削除',
    filterPanelLogicOperator: 'Logic operator',
    filterPanelOperator: '条件',
    filterPanelOperatorAnd: 'And',
    filterPanelOperatorOr: 'Or',
    filterPanelColumns: '項目',
    filterPanelInputLabel: '値',
    filterPanelInputPlaceholder: '',

    // Filter operators text
    filterOperatorContains: '含む',
    // filterOperatorEquals: 'equals',
    // filterOperatorStartsWith: 'starts with',
    // filterOperatorEndsWith: 'ends with',
    // filterOperatorIs: 'is',
    // filterOperatorNot: 'is not',
    // filterOperatorAfter: 'is after',
    // filterOperatorOnOrAfter: 'is on or after',
    // filterOperatorBefore: 'is before',
    // filterOperatorOnOrBefore: 'is on or before',
    // filterOperatorIsEmpty: 'is empty',
    // filterOperatorIsNotEmpty: 'is not empty',
    // filterOperatorIsAnyOf: 'is any of',
    'filterOperator=': '一致',
    'filterOperator!=': '一致しない',
    'filterOperator>': 'より大きい',
    'filterOperator>=': '以上',
    'filterOperator<': 'より小さい',
    'filterOperator<=': '以下',
  }

  return (
    <Container sx={{ py: 2, px: 1.5 }}>
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
                backgroundColor: '#EEE',
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
            sortModel={sortModel}
            localeText={localeText}
            onSortModelChange={(model) => setSortModel(model)}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
