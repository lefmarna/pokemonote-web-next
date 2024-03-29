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
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSWROpenApi } from '@/libs/swr'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { useAuthUserState } from '@/store/authUserState'
import { usePokemonBasicInfosState } from '@/store/pokemonBasicInfosState'
import { SLink } from '@/styles'
import { requestOpenapi } from '@/utils/helpers'
import type { PokemonBasicInfo, PokemonSummary } from '@/types/openapi/schemas'

export const PokemonDetail = () => {
  const searchParams = useSearchParams()

  const router = useRouter()
  const authUser = useAuthUserState()
  const pokemonBasicInfos = usePokemonBasicInfosState()

  const [pokemonSummary, setPokemonSummary] = useState<PokemonSummary | null>(
    null
  )
  const [description, setDescription] = useState<string>('')

  const [pokemonBasicInfo, setPokemonBasicInfo] =
    useState<PokemonBasicInfo | null>(null)

  const { data, error } = useSWROpenApi({
    url: '/api/v2/pokemons/{id}',
    path: {
      id: searchParams.get('id') ?? '',
    },
  })

  useEffect(() => {
    if (data === undefined) return

    const { description: _description, ..._pokemonSummary } = data.data
    setDescription(_description)
    setPokemonSummary(_pokemonSummary)
  }, [data])

  useEffect(() => {
    if (error === undefined) return

    router.push('/')
  }, [error, router])

  useEffect(() => {
    const targetPokemonBasicInfo = pokemonBasicInfos.find(
      (basicInfo) => basicInfo.name === pokemonSummary?.pokemonName
    )

    if (targetPokemonBasicInfo === undefined) return

    setPokemonBasicInfo(targetPokemonBasicInfo)
  }, [pokemonBasicInfos, pokemonSummary])

  const handleEditItem = (item: PokemonSummary) => {
    if (item.user.username === authUser?.username) {
      router.push(`/pokemons/edit?id=${item.id}`)
    } else {
      router.push('/')
    }
  }

  const handleDeleteItem = async (id: number) => {
    try {
      await requestOpenapi({
        url: '/api/v2/pokemons/{id}',
        method: 'delete',
        path: {
          id: String(id),
        },
      })
      router.replace(`/users/detail/?username=${authUser?.username}`)
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
            <TableCell align="right">{pokemonSummary.pokemonName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">レベル</TableCell>
            <TableCell align="right">{pokemonSummary.level}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">性格</TableCell>
            <TableCell align="right">{pokemonSummary.natureName}</TableCell>
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
      {description && (
        <>
          <span>ポケモンの説明</span>
          <p>{description}</p>
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
          <SLink
            href={{
              pathname: '/users/detail',
              query: { username: pokemonSummary.user.username },
            }}
          >
            {pokemonSummary.user.nickname}
          </SLink>
        </Typography>
      )}
    </Container>
  )
}
