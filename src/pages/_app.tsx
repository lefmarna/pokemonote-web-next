import { Box, ThemeProvider } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { memo, useEffect, useState } from 'react'
import { RecoilRoot } from 'recoil'
import useSWR, { SWRConfig } from 'swr'
import '@/styles/globals.scss'
import { AppProps } from 'next/app'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import { theme, useMediaQueryUp } from '@/utils/theme'
import { useAuthUserMutators } from '@/store/authUserState'
import Head from 'next/head'
import { useNaturesMutators } from '@/store/naturesState'
import { usePokemonBasicInfosSMutators } from '@/store/pokemonBasicInfosState'
import { AuthUser, Nature, PokemonBasicInfo } from '@/types'

const AppInit = memo(() => {
  const { updateAuthUser } = useAuthUserMutators()

  const { updatePokemonBasicInfos } = usePokemonBasicInfosSMutators()
  const { updateNatures } = useNaturesMutators()

  const { data: loginData } = useSWR<{
    data: {
      auth_user: AuthUser | null
    }
  }>('/init/login', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const { data: StaticData } = useSWR<{
    data: {
      pokemon_basic_infos: PokemonBasicInfo[]
      natures: Nature[]
    }
  }>('/init/fetch', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  useEffect(() => {
    if (!loginData || !StaticData) return
    updateAuthUser(loginData.data.auth_user)
    updatePokemonBasicInfos(StaticData.data.pokemon_basic_infos)
    updateNatures(StaticData.data.natures)
  }, [loginData, StaticData, updateAuthUser, updatePokemonBasicInfos, updateNatures])

  return <></>
})

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL
  axios.defaults.withCredentials = true

  const swrConfigValue = {
    fetcher: (url: string) => axios.get(url).then((res) => res.data),
    onError: (error: AxiosError) => {
      switch (error.status) {
        case 404:
          console.log(error)
          break
        case 403:
          console.log(error)
          break
        default:
          console.log(error)
      }
    },
  }

  const isLargeUpScreen = useMediaQueryUp('lg')

  const [drawer, setDrawer] = useState(false)

  const drawerWidth = 257

  const toggleDrawer = () => {
    setDrawer(!drawer)
  }

  const onCloseDrawer = () => {
    setDrawer(false)
  }

  useEffect(() => {
    setDrawer(isLargeUpScreen)
  }, [isLargeUpScreen])

  const meta = {
    title: 'Pokemonote',
    description:
      'ポケモンのステータスを計算・管理するためのWebアプリ『Pokemonote』へようこそ！ 素早さ計算機やSVに対応した種族値ランキングといったツールも公開しています。「シンプルで高機能」なツールにこだわって制作していますので、是非お試しください。',
  } as const

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="https://pokemonote.com/twitter_card.jpg" />
        <meta property="twitter:title" content={meta.title} />
        <meta property="twitter:description" content={meta.description} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@lefmarna" />
        <meta property="format-detection" content="telephone=no" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <SWRConfig value={swrConfigValue}>
            <Sidebar drawer={drawer} onCloseDrawer={onCloseDrawer} />
            <AppInit />
            <Box
              component="main"
              sx={{ paddingLeft: drawer && isLargeUpScreen ? `${drawerWidth}px` : 0 }}
            >
              <Header toggleDrawer={toggleDrawer} />
              <Component {...pageProps} />
            </Box>
          </SWRConfig>
        </RecoilRoot>
      </ThemeProvider>
    </>
  )
}
