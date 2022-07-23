import { Box, Container, Grid, TextField } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { SyntheticEvent } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CalcButton } from '../components/molecules/CalcButton'
import { SearchField } from '../components/molecules/SearchField'
import {
  natureDataState,
  pokemonDataState,
  selectedNatureState,
  selectedPokemonState,
} from '../store'
import styles from '../styles/Home.module.scss'
import { Nature, PokemonData } from '../types'

const Home: NextPage = () => {
  const pokemonData = useRecoilValue(pokemonDataState)
  const natureData = useRecoilValue(natureDataState)

  const [selectedPokemon, setSelectedPokemon] = useRecoilState(selectedPokemonState)
  const [selectedNature, setSelectedNature] = useRecoilState(selectedNatureState)

  const router = useRouter()

  const onChangeSelectedPokemon = (
    event: SyntheticEvent<Element, Event>,
    value: PokemonData | null
  ) => {
    if (value === null) return
    setSelectedPokemon(value)
  }

  const onChangeSelectedNature = (event: SyntheticEvent<Element, Event>, value: Nature | null) => {
    if (value === null) return
    setSelectedNature(value)
  }

  const onClickRouterPush = () => {
    router.push('/test')
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Grid container spacing={{ md: 4, lg: 8, xl: 12 }}>
          <Grid item xs={12} md={6}>
            <SearchField
              options={pokemonData}
              label="ポケモン名"
              itemName="ポケモン"
              onChange={onChangeSelectedPokemon}
              selectedItem={selectedPokemon}
            />
            <Grid container>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex' }}>
                  <Box>
                    <TextField
                      type="tel"
                      label="レベル"
                      placeholder="1"
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Box>
                  <Box>
                    <CalcButton>100</CalcButton>
                    <CalcButton>1</CalcButton>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={8}>
                <SearchField
                  options={natureData}
                  label="性格"
                  itemName="性格"
                  onChange={onChangeSelectedNature}
                  selectedItem={selectedNature}
                  disableClearable={true}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </Container>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <button onClick={onClickRouterPush}>Testへ</button>

        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/canary/examples" className={styles.card}>
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
