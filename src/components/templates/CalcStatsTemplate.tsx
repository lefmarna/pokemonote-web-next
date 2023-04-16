import { Container, Grid } from '@mui/material'
import { Nature, NullableStats, Pokemon, PokemonBasicInfo, StatsKey } from '@/types'
import { MAX_EV, MAX_REAL_NUMBER, MAX_TOTAL_EV, MIN_LEVEL } from '@/utils/constants'
import { convertToInteger, numberToInt, valueVerification } from '@/utils/utilities'
import { BaseStatsField } from '@/components/organisms/BaseStatsField'
import { CalcStatsOptions } from '@/components/organisms/CalcStatsOptions'
import { EffortValueField } from '@/components/organisms/EffortValueField'
import { IndividualValueField } from '@/components/organisms/IndividualValueField'
import { RealNumberField } from '@/components/organisms/RealNumberField'
import { StatsTableHeader } from '@/components/organisms/StatsTableHeader'
import { usePokemonStats } from '@/hooks/usePokemonStats'

type Props = {
  pokemon: Pokemon
  buttonText: string
  updateBasicInfo: (pokemon: PokemonBasicInfo) => void
  updateNature: (nature: Nature) => void
  updateLevel: (level: number | '') => void
  updateIvs: (newIvs: Partial<NullableStats>) => void
  updateEvs: (newEvs: Partial<NullableStats>) => void
}

export const CalcStatsTemplate = (props: Props) => {
  const { pokemon, buttonText, updateBasicInfo, updateNature, updateLevel, updateIvs, updateEvs } =
    props
  const {
    adjustRealNumber,
    calcEv,
    getPureRealNumber,
    getNatureModifier,
    getRealNumber,
    getStatsInitial,
    getTotalValue,
  } = usePokemonStats()

  const statsKeys: StatsKey[] = ['hp', 'attack', 'defense', 'spAttack', 'spDefense', 'speed']

  /**
   * 実数値はその他の要素（努力値など）の更新による自動計算によって求める
   */
  const realNumbers = {
    hp: getRealNumber(
      'hp',
      pokemon.basicInfo.name,
      pokemon.level,
      pokemon.basicInfo.baseStats.hp,
      pokemon.ivs.hp,
      pokemon.evs.hp
    ),
    attack: getRealNumber(
      'attack',
      pokemon.basicInfo.name,
      pokemon.level,
      pokemon.basicInfo.baseStats.attack,
      pokemon.ivs.attack,
      pokemon.evs.attack,
      getNatureModifier('attack', pokemon.nature)
    ),
    defense: getRealNumber(
      'defense',
      pokemon.basicInfo.name,
      pokemon.level,
      pokemon.basicInfo.baseStats.defense,
      pokemon.ivs.defense,
      pokemon.evs.defense,
      getNatureModifier('defense', pokemon.nature)
    ),
    spAttack: getRealNumber(
      'spAttack',
      pokemon.basicInfo.name,
      pokemon.level,
      pokemon.basicInfo.baseStats.spAttack,
      pokemon.ivs.spAttack,
      pokemon.evs.spAttack,
      getNatureModifier('spAttack', pokemon.nature)
    ),
    spDefense: getRealNumber(
      'spDefense',
      pokemon.basicInfo.name,
      pokemon.level,
      pokemon.basicInfo.baseStats.spDefense,
      pokemon.ivs.spDefense,
      pokemon.evs.spDefense,
      getNatureModifier('spDefense', pokemon.nature)
    ),
    speed: getRealNumber(
      'speed',
      pokemon.basicInfo.name,
      pokemon.level,
      pokemon.basicInfo.baseStats.speed,
      pokemon.ivs.speed,
      pokemon.evs.speed,
      getNatureModifier('speed', pokemon.nature)
    ),
  }

  /**
   * 実数値から努力値を求める
   */
  const getEffortValue = (newRealNumber: number | '', statKey: StatsKey) => {
    const formatNewRealNumber = Number(convertToInteger(newRealNumber, MAX_REAL_NUMBER, false))
    const formatLv = numberToInt(pokemon.level, MIN_LEVEL)
    const baseStat = pokemon.basicInfo.baseStats[statKey]
    const formatIv = numberToInt(pokemon.ivs[statKey])
    const formatEv = numberToInt(pokemon.evs[statKey])
    const natureModifier = statKey !== 'hp' ? getNatureModifier(statKey, pokemon.nature) : 1

    const adjustedRealNumber = adjustRealNumber(
      formatNewRealNumber,
      formatLv,
      baseStat,
      formatIv,
      formatEv,
      natureModifier
    )

    const pureRealNumber = getPureRealNumber(adjustedRealNumber, natureModifier)
    const newEv = calcEv(statKey, pureRealNumber, formatLv, baseStat, formatIv)

    return valueVerification(newEv, MAX_EV)
  }

  const updateRealNumber = (realNumber: number | '', statKey: StatsKey) => {
    const newEv = getEffortValue(realNumber, statKey)
    updateEvs({ [statKey]: newEv })
  }

  // 種族値の合計値
  const totalBaseStats = () => {
    return getTotalValue(Object.values(pokemon.basicInfo.baseStats))
  }

  // 個体値の合計値
  const totalIv = () => {
    return getTotalValue(Object.values(pokemon.ivs))
  }

  // 努力値の合計値
  const totalEv = () => {
    return getTotalValue(Object.values(pokemon.evs))
  }

  // 実数値の合計値
  const totalStats = () => {
    return getTotalValue(Object.values(realNumbers))
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
      tmpHp = getRealNumber(
        'hp',
        pokemon.basicInfo.name,
        pokemon.level,
        pokemon.basicInfo.baseStats.hp,
        pokemon.ivs.hp,
        tmpHpEV
      )

      tmpSpDefenceEV = remainderEffortValue - tmpHpEV

      if (tmpSpDefenceEV > MAX_EV) {
        tmpSpDefenceEV = MAX_EV
      }

      // 防御より先に特防を計算することで、端数が出た場合に特防に割り振られるようになる(ダウンロード対策でB<Dのほうが好まれることから、このような仕様にしている)
      while (tmpSpDefenceEV >= 0) {
        // 特防の努力値から特防の実数値を計算
        tmpSpDefence = getRealNumber(
          'spDefense',
          pokemon.basicInfo.name,
          pokemon.level,
          pokemon.basicInfo.baseStats.spDefense,
          pokemon.ivs.spDefense,
          tmpSpDefenceEV,
          getNatureModifier('spDefense', pokemon.nature)
        )

        tmpDefenceEV = remainderEffortValue - tmpHpEV - tmpSpDefenceEV

        // 防御の仮努力値が最大値を超えてしまう場合には値を更新しない
        if (tmpDefenceEV > MAX_EV) break

        // 防御の努力値から防御の実数値を計算
        tmpDefence = getRealNumber(
          'defense',
          pokemon.basicInfo.name,
          pokemon.level,
          pokemon.basicInfo.baseStats.defense,
          pokemon.ivs.defense,
          tmpDefenceEV,
          getNatureModifier('defense', pokemon.nature)
        )

        // 耐久補正込での耐久値を求める
        tmpDefenceEnhancement = Math.floor(tmpDefence * selectDefenceEnhancement)
        tmpSpDefenceEnhancement = Math.floor(tmpSpDefence * selectSpDefenceEnhancement)

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
            const diff = Math.abs(tmpDefenceEnhancement - tmpSpDefenceEnhancement)
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
      hp: getEffortValue(resultHp, 'hp'),
      defense: getEffortValue(resultDefence, 'defense'),
      spDefense: getEffortValue(resultSpDefence, 'spDefense'),
    })
  }

  return (
    <Container sx={{ pt: 2 }}>
      <Grid container spacing={{ md: 4, lg: 8, xl: 12 }} columns={{ xs: 9, md: 18 }}>
        <Grid item md={9} xs={18}>
          <StatsTableHeader
            basicInfo={pokemon.basicInfo}
            nature={pokemon.nature}
            level={pokemon.level}
            updateBasicInfo={updateBasicInfo}
            updateNature={updateNature}
            updateLevel={updateLevel}
          />
          {statsKeys.map((statKey) => (
            <Grid container columns={18} key={statKey} sx={{ mt: 1 }}>
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
          <Grid container columns={18} sx={{ mt: 1 }}>
            <Grid item xs={3} sx={{ pl: { xs: 2, sm: 3 } }}>
              {totalBaseStats()}
            </Grid>
            <Grid item xs={5} sx={{ pl: { xs: 2, sm: 3 } }}>
              {totalIv()}
            </Grid>
            <Grid item xs={5} sx={{ pl: { xs: 2, sm: 3 } }}>
              <span>{totalEv()}</span>/&nbsp;{MAX_TOTAL_EV}
            </Grid>
            <Grid item xs={5} sx={{ pl: { xs: 2, sm: 3 } }}>
              {totalStats()}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={9} xs={18}>
          <CalcStatsOptions
            description={pokemon.description}
            buttonText={buttonText}
            realNumbers={realNumbers}
            updateEvs={updateEvs}
            durabilityAdjustment={durabilityAdjustment}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
