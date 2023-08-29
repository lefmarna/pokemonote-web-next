'use client'

import styled from '@emotion/styled'
import {
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Grow,
  Paper,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { SH2 } from '@/styles'
import type { Response } from '@/types/openapi/extractor'

const UpdateDate = styled.h3`
  padding: 3px 0px;
  margin-bottom: 3px;
  border-bottom: double 5px #90caf9;
`

export const Home = () => {
  const path = '/api/v2/top'
  const { data, isLoading } = useSWR<Response<typeof path, 'get'>>(path)

  const [ranking, setRanking] = useState<{ name: string }[]>([])

  useEffect(() => {
    if (data === undefined) return
    setRanking(data.data)
  }, [data])

  if (isLoading) return <LoadingPageTemplate />

  return (
    <div>
      <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
        <Image
          src="/images/pokemonote.svg"
          alt="Pokemonote"
          layout="responsive"
          width={1640}
          height={492}
        />
      </Grow>
      <Container>
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: 'center' }}>
                <SH2>人気のポケモン</SH2>
                <List>
                  {ranking.map((item, index) => (
                    <ListItem key={item.name}>
                      <Typography>{`${index + 1}位 ${item.name}`}</Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Card elevation={3}>
              <CardContent>
                <SH2>更新情報</SH2>
                <Paper style={{ maxHeight: 280, overflow: 'auto' }}>
                  <Box sx={{ mx: 2 }}>
                    <div>
                      <UpdateDate>2023-05-30</UpdateDate>
                      <p>種族値ランキングでホームの解禁ポケモンに対応</p>
                    </div>
                    <div>
                      <UpdateDate>2023-02-28</UpdateDate>
                      <p>ウネルミナモ・テツノイサハ対応</p>
                    </div>
                    <div>
                      <UpdateDate>2023-02-13</UpdateDate>
                      <p>「パスワードをお忘れの方はこちら」機能の実装</p>
                    </div>
                  </Box>
                  <Box sx={{ mx: 2 }}>
                    <div>
                      <UpdateDate>2023-02-07</UpdateDate>
                      <p>メールアドレスの更新機能の公開</p>
                    </div>
                  </Box>
                  <Box sx={{ mx: 2 }}>
                    <div>
                      <UpdateDate>2023-02-04</UpdateDate>
                      <p>
                        メールアドレスの更新機能の実装（正常に動作しなかったため一旦公開停止）
                      </p>
                    </div>
                  </Box>
                  <Box sx={{ mx: 2 }}>
                    <div>
                      <UpdateDate>2023-01-11</UpdateDate>
                      <p>アカウント情報の変更機能の実装</p>
                    </div>
                  </Box>
                  <Box sx={{ mx: 2 }}>
                    <div>
                      <UpdateDate>2022-12-31</UpdateDate>
                      <p>パスワードの更新機能の実装</p>
                    </div>
                  </Box>
                  <Box sx={{ mx: 2 }}>
                    <div>
                      <UpdateDate>2022-12-23</UpdateDate>
                      <p>
                        ステータス計算機で保存されたはずのポケモンの説明が表示されない不具合の修正
                      </p>
                    </div>
                  </Box>
                  <Box sx={{ mx: 2 }}>
                    <div>
                      <UpdateDate>2022-12-03</UpdateDate>
                      <p>ポケモンSV対応完了</p>
                    </div>
                  </Box>
                  <Box sx={{ mx: 2 }}>
                    <div>
                      <UpdateDate>2022-11-26</UpdateDate>
                      <p>ポケモンSV対応準備（随時追加予定）</p>
                    </div>
                  </Box>
                  <Box sx={{ mx: 2 }}>
                    <div>
                      <UpdateDate>2021-11-18</UpdateDate>
                      <p>『Pokemonote』α版を公開しました。</p>
                    </div>
                  </Box>
                  <Box sx={{ mx: 2 }}>
                    <div>
                      <UpdateDate>2021-04-30</UpdateDate>
                      <p>『Pokemonote』プロトタイプを公開しました。</p>
                    </div>
                  </Box>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent>
                <SH2>Pokemonoteについて</SH2>
                <Box sx={{ px: 2, pt: 2, pb: 1 }}>
                  <p>
                    当サイトは、個人の運営するファンサイトであり、株式会社ポケモンや任天堂、その他各企業様とは一切関係ありません。
                  </p>
                  <p>
                    ポケットモンスター・ポケモン・Pokémonは任天堂・クリーチャーズ・ゲームフリークの登録商標です。
                  </p>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
