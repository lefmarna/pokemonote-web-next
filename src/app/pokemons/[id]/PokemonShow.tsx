'use client'

import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { $axios } from '@/libs/axios'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { useAuthUserState } from '@/store/authUserState'
import { usePokemonBasicInfosState } from '@/store/pokemonBasicInfosState'
import type { PokemonBasicInfo, PokemonSummary } from '@/types'

type Props = {
  pokemonSummary: PokemonSummary
}

export const PokemonShow = (props: Props) => {
  const { pokemonSummary } = props

  const router = useRouter()
  const authUser = useAuthUserState()
  const pokemonBasicInfos = usePokemonBasicInfosState()

  const [pokemonBasicInfo, setPokemonBasicInfo] =
    useState<PokemonBasicInfo | null>(null)

  useEffect(() => {
    const targetPokemonBasicInfo = pokemonBasicInfos.find(
      (basicInfo) => basicInfo.name === pokemonSummary?.name
    )

    if (targetPokemonBasicInfo === undefined) return

    setPokemonBasicInfo(targetPokemonBasicInfo)
  }, [pokemonBasicInfos, pokemonSummary])

  const handleEditItem = (item: PokemonSummary) => {
    if (item.user.username === authUser?.username) {
      router.push(`/pokemons/${item.id}/edit`)
    } else {
      router.push('/')
    }
  }

  const handleDeleteItem = async (id: number) => {
    try {
      await $axios.delete(`/pokemons/${id}`)
      router.push(`/users/${authUser?.username}`)
    } catch (error) {
      router.push('/')
    }
  }

  if (pokemonSummary === null || !pokemonBasicInfo)
    return <LoadingPageTemplate />

  return (
    <Container>
      <Typography>
        ポケモンの詳細ページは、現在コンテンツの表示を調整中です。
      </Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align="left">No</TableCell>
            <TableCell align="right">{pokemonBasicInfo.no}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">ポケモン名</TableCell>
            <TableCell align="right">{pokemonSummary.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">レベル</TableCell>
            <TableCell align="right">{pokemonSummary.lv}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">性格</TableCell>
            <TableCell align="right">{pokemonSummary.nature}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">種族値</TableCell>
            <TableCell align="right">
              {pokemonBasicInfo.baseStats.hp}-
              {pokemonBasicInfo.baseStats.attack}-
              {pokemonBasicInfo.baseStats.defense}-
              {pokemonBasicInfo.baseStats.spAttack}-
              {pokemonBasicInfo.baseStats.spDefense}-
              {pokemonBasicInfo.baseStats.speed}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">ステータス</TableCell>
            <TableCell align="right">{pokemonSummary.stats}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {pokemonSummary.description && (
        <>
          <span>ポケモンの説明</span>
          <p>{pokemonSummary.description}</p>
        </>
      )}
      {pokemonSummary.user.username === authUser?.username ? (
        <Box display="flex" justifyContent="center">
          <Button
            color="primary"
            onClick={() => handleEditItem(pokemonSummary)}
          >
            編集
          </Button>
          <Button
            color="error"
            onClick={() => handleDeleteItem(pokemonSummary.id)}
          >
            削除
          </Button>
        </Box>
      ) : (
        <Typography>
          投稿者：
          <Link href={`/users/${pokemonSummary.user.username}`}>
            {pokemonSummary.user.nickname}
          </Link>
        </Typography>
      )}
    </Container>
  )
}
