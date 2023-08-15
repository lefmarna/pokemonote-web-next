'use client'

import { Apps, Autorenew, Send } from '@mui/icons-material'
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Dialog,
  Grid,
  Paper,
} from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { Title } from '../molecules/Title'
import { BaseStatsField } from '@/components/organisms/BaseStatsField'
import { CalcStatsOptions } from '@/components/organisms/CalcStatsOptions'
import { EffortValueField } from '@/components/organisms/EffortValueField'
import { IndividualValueField } from '@/components/organisms/IndividualValueField'
import { RealNumberField } from '@/components/organisms/RealNumberField'
import { StatsTableHeader } from '@/components/organisms/StatsTableHeader'
import { usePokemonStats } from '@/hooks/usePokemonStats'
import { useAuthUserState } from '@/store/authUserState'
import { MAX_EV, MAX_TOTAL_EV } from '@/utils/constants'
import { useMediaQueryDown } from '@/utils/theme'
import type {
  Nature,
  NullableStats,
  Pokemon,
  PokemonBasicInfo,
  StatsKey,
} from '@/types'
import type { PokemonPostParams } from '@/types/openapi/schemas'
import type { ReactNode } from 'react'

type Props = {
  title: string
  pokemon: Pokemon
  buttonText: string
  isLoading: boolean
  updateBasicInfo: (pokemon: PokemonBasicInfo) => void
  updateNature: (nature: Nature) => void
  updateLevel: (level: number | null) => void
  updateIvs: (newIvs: Partial<NullableStats>) => void
  updateEvs: (newEvs: Partial<NullableStats>) => void
  sendPokemon: (params: PokemonPostParams) => Promise<void>
  updateDescription: (newDescription: string) => void
}

export const CalcStatsTemplate = (props: Props) => {
  const {
    title,
    pokemon,
    buttonText,
    isLoading,
    updateBasicInfo,
    updateNature,
    updateLevel,
    updateIvs,
    updateEvs,
    sendPokemon,
    updateDescription,
  } = props

  const {
    realNumbers,
    getEv,
    getNatureModifier,
    getRealNumber,
    getStatsInitial,
    totalBaseStats,
    totalIv,
    totalEv,
    totalStats,
  } = usePokemonStats(pokemon)

  const statsKeys: StatsKey[] = [
    'hp',
    'attack',
    'defense',
    'spAttack',
    'spDefense',
    'speed',
  ]

  const updateRealNumber = (
    newRealNumber: number | null,
    statKey: StatsKey
  ) => {
    const newEv = getEv(newRealNumber, statKey)

    updateEvs({ [statKey]: newEv })
  }

  const durabilityAdjustment = (
    calcStyle: string,
    selectDefenceEnhancement: number,
    selectSpDefenceEnhancement: number
  ) => {
    // 攻撃、特攻、素早さの努力値を除いた値を求める
    const remainderEffortValue =
      MAX_TOTAL_EV -
      Number(pokemon.evs.attack) -
      Number(pokemon.evs.spAttack) -
      Number(pokemon.evs.speed)

    // 計算に使う努力値を一時的に格納しておくための変数
    let tmpHpEV = remainderEffortValue // HPから順に計算していくので、最初に余りの努力値をそのまま代入している
    let tmpDefenceEV = 0
    let tmpSpDefenceEV = 0

    // 計算に使う実数値を一時的に格納しておくための変数
    let tmpHp = 0
    let tmpDefence = 0
    let tmpSpDefence = 0

    // 実数値の計算は耐久補正込で行うが、代入する際には元の値を使うため、別の変数を用意することにした
    let tmpDefenceEnhancement = 0
    let tmpSpDefenceEnhancement = 0

    // 最終的に代入することになる実数値を格納しておくための変数
    let resultHp = 0
    let resultDefence = 0
    let resultSpDefence = 0

    // 計算された耐久指数を比較していくのに用いる変数
    let oldHBD = 0
    let newHBD = 0

    // 計算スタイルが H=B+D の際に、BとDの差分を比較するのに用いる変数
    let tmpDiff: number | null = null

    // 努力値の余りが最大値より大きかった場合、スタートであるHPの仮努力値を最大値とする
    if (tmpHpEV > MAX_EV) tmpHpEV = MAX_EV

    // HP→特防→防御の順に総当たりで計算していく
    while (tmpHpEV >= 0) {
      // HPの努力値からHPの実数値を計算
      tmpHp = getRealNumber('hp', tmpHpEV)

      tmpSpDefenceEV = remainderEffortValue - tmpHpEV

      if (tmpSpDefenceEV > MAX_EV) {
        tmpSpDefenceEV = MAX_EV
      }

      // 防御より先に特防を計算することで、端数が出た場合に特防に割り振られるようになる(ダウンロード対策でB<Dのほうが好まれることから、このような仕様にしている)
      while (tmpSpDefenceEV >= 0) {
        // 特防の努力値から特防の実数値を計算
        tmpSpDefence = getRealNumber('spDefense', tmpSpDefenceEV)

        tmpDefenceEV = remainderEffortValue - tmpHpEV - tmpSpDefenceEV

        // 防御の仮努力値が最大値を超えてしまう場合には値を更新しない
        if (tmpDefenceEV > MAX_EV) break

        // 防御の努力値から防御の実数値を計算
        tmpDefence = getRealNumber('defense', tmpDefenceEV)

        // 耐久補正込での耐久値を求める
        tmpDefenceEnhancement = Math.floor(
          tmpDefence * selectDefenceEnhancement
        )
        tmpSpDefenceEnhancement = Math.floor(
          tmpSpDefence * selectSpDefenceEnhancement
        )

        // 耐久指数を計算する（計算スタイルによって結果が異なる）
        if (calcStyle === 'balance') {
          newHBD =
            (tmpHp * tmpDefenceEnhancement * tmpSpDefenceEnhancement) /
            (tmpDefenceEnhancement + tmpSpDefenceEnhancement)
        }

        if (calcStyle === 'performance') {
          newHBD = tmpHp * (tmpDefenceEnhancement + tmpSpDefenceEnhancement)

          // NOTE 結果が同じ時には防御と特防の差が小さい方が好ましいため、最も差分の小さな値を入れるようにしている
          if (oldHBD === newHBD && resultHp === tmpHp) {
            const diff = Math.abs(
              tmpDefenceEnhancement - tmpSpDefenceEnhancement
            )
            if (tmpDiff === null || tmpDiff > diff) {
              tmpDiff = diff
              resultDefence = tmpDefence
              resultSpDefence = tmpSpDefence
            }
          }
        }

        // 耐久指数が前回のものより大きければ更新、そうでなければ更新しない
        if (oldHBD < newHBD) {
          oldHBD = newHBD
          resultHp = tmpHp
          resultDefence = tmpDefence
          resultSpDefence = tmpSpDefence
          tmpDiff = null
        }
        tmpSpDefenceEV--
      }
      tmpHpEV--
    }

    // 最も優秀だった結果を代入する
    updateEvs({
      hp: getEv(resultHp, 'hp'),
      defense: getEv(resultDefence, 'defense'),
      spDefense: getEv(resultSpDefence, 'spDefense'),
    })
  }

  const resetEffortValue = () => {
    console.log('resetEffortValue')
  }

  const [dialog, setDialog] = useState(false)

  const handleOpen = () => {
    setDialog(true)
  }

  const handleClose = () => {
    setDialog(false)
  }

  const isMdDown = useMediaQueryDown('md')

  const wrapCalcStatsOptions = (children: ReactNode) => {
    return isMdDown ? (
      <Dialog open={dialog} onClose={handleClose}>
        <Box sx={{ px: 2, py: 2 }}>{children}</Box>
      </Dialog>
    ) : (
      <Grid item md={9} xs={18}>
        {children}
      </Grid>
    )
  }

  const authUser = useAuthUserState()

  const submit = () => {
    const params: PokemonPostParams = {
      name: pokemon.basicInfo.name,
      nature: pokemon.nature.name,
      level: pokemon.level,
      ivs: {
        hp: pokemon.ivs.hp,
        attack: pokemon.ivs.attack,
        defense: pokemon.ivs.defense,
        spAttack: pokemon.ivs.spAttack,
        spDefense: pokemon.ivs.spDefense,
        speed: pokemon.ivs.speed,
      },
      evs: {
        hp: pokemon.evs.hp,
        attack: pokemon.evs.attack,
        defense: pokemon.evs.defense,
        spAttack: pokemon.evs.spAttack,
        spDefense: pokemon.evs.spDefense,
        speed: pokemon.evs.speed,
      },
      realNumbers: {
        hp: realNumbers.hp,
        attack: realNumbers.attack,
        defense: realNumbers.defense,
        spAttack: realNumbers.spAttack,
        spDefense: realNumbers.spDefense,
        speed: realNumbers.speed,
      },
      description: pokemon.description,
      isPublic: true,
    }

    sendPokemon(params)
  }

  return (
    <>
      <Container sx={{ py: 2, px: 1.5 }}>
        <Title text={title} />
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
            {statsKeys.map((statKey) => (
              <Grid container columns={256} key={statKey} sx={{ mt: 2 }}>
                <BaseStatsField
                  value={pokemon.basicInfo.baseStats[statKey]}
                  statsInitial={getStatsInitial(statKey)}
                  natureStat={getNatureModifier(statKey, pokemon.nature)}
                />
                <IndividualValueField
                  value={pokemon.ivs[statKey]}
                  statKey={statKey}
                  updateIvs={updateIvs}
                />
                <EffortValueField
                  value={pokemon.evs[statKey]}
                  statKey={statKey}
                  updateEvs={updateEvs}
                />
                <RealNumberField
                  value={realNumbers[statKey]}
                  statKey={statKey}
                  updateRealNumber={updateRealNumber}
                />
              </Grid>
            ))}
            <Grid container columns={256} sx={{ mt: 1 }}>
              <Grid item xs={33} textAlign={'center'}>
                {totalBaseStats()}
              </Grid>
              <Grid item xs={73} textAlign={'center'}>
                {totalIv()}
              </Grid>
              <Grid item xs={77} textAlign={'center'}>
                <span>{totalEv()}</span>/&nbsp;{MAX_TOTAL_EV}
              </Grid>
              <Grid item xs={73} textAlign={'center'}>
                {totalStats()}
              </Grid>
            </Grid>
          </Grid>
          {/* 画面右 */}
          {wrapCalcStatsOptions(
            <CalcStatsOptions
              description={pokemon.description}
              buttonText={buttonText}
              realNumbers={realNumbers}
              isLoading={isLoading}
              updateEvs={updateEvs}
              durabilityAdjustment={durabilityAdjustment}
              submit={submit}
              updateDescription={updateDescription}
            />
          )}
        </Grid>
      </Container>
      {/* フッター */}
      {isMdDown && (
        <Box sx={{ pb: 7 }}>
          <Paper
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
            <BottomNavigation showLabels>
              <BottomNavigationAction
                onClick={resetEffortValue}
                icon={<Autorenew />}
              />
              <BottomNavigationAction onClick={handleOpen} icon={<Apps />} />
              {authUser && (
                <BottomNavigationAction
                  onClick={handleClose}
                  icon={<Send color="primary" />}
                />
              )}
            </BottomNavigation>
          </Paper>
        </Box>
      )}
    </>
  )
}
