'use client'

import styled from '@emotion/styled'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { memo, useState } from 'react'
import { AdCode } from '@/components/organisms/AdCode'
import { useAuthUserState } from '@/store/authUserState'
import type { NullableStats, Stats } from '@/types/front'
import type { SelectChangeEvent } from '@mui/material'
import type { ChangeEvent } from 'react'

const MyCard = styled('div')`
  height: 100%;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 12px;
  border: thin solid rgba(0, 0, 0, 0.24);
  display: block;
  max-width: 100%;
  outline: none;
  text-decoration: none;
  transition-property: box-shadow, opacity;
  word-wrap: break-word;
  position: relative;
  white-space: normal;
`

const MyCardTitle = styled('div')`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  word-break: break-all;
  padding: 16px;
`

type Props = {
  buttonText: string
  description: string
  realNumbers: Stats
  isLoading: boolean
  isDialog?: boolean
  updateEvs: (newIvs: Partial<NullableStats>) => void
  durabilityAdjustment: (
    calcStyle: string,
    selectDefenseEnhancement: number,
    selectSpDefenseEnhancement: number
  ) => void
  closeDialog?: () => void
  submit: () => void
  updateDescription: (newDescription: string) => void
}

export const CalcStatsOptions = memo(function CalcStatsOptions(props: Props) {
  const {
    buttonText,
    description,
    realNumbers,
    isLoading,
    isDialog = false,
    updateEvs,
    durabilityAdjustment,
    closeDialog,
    submit,
    updateDescription,
  } = props

  const [selectDefenseEnhancement, setSelectDefenseEnhancement] = useState(1)
  const [selectSpDefenseEnhancement, setSelectSpDefenseEnhancement] =
    useState(1)
  const [calcStyle, setCalcStyle] = useState('balance')

  const updateSelectDefenseEnhancement = (event: SelectChangeEvent<number>) => {
    setSelectDefenseEnhancement(Number(event.target.value))
  }
  const updateSelectSpDefenseEnhancement = (
    event: SelectChangeEvent<number>
  ) => {
    setSelectSpDefenseEnhancement(Number(event.target.value))
  }

  const updateCalcStyle = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setCalcStyle(value)
  }

  // 物理耐久指数を求める
  const physicalDurability = () => {
    return (
      realNumbers.hp *
      Math.floor(realNumbers.defense * selectDefenseEnhancement)
    )
  }

  // 特殊耐久指数を求める
  const specialDurability = () => {
    return (
      realNumbers.hp *
      Math.floor(realNumbers.spDefense * selectSpDefenseEnhancement)
    )
  }

  // 努力値をリセットする
  const resetEffortValue = (): void => {
    updateEvs({
      hp: null,
      attack: null,
      defense: null,
      spAttack: null,
      spDefense: null,
      speed: null,
    })
  }

  const magnificationItems = [
    { id: 1, name: '2.0', value: 2.0 },
    { id: 2, name: '1.5', value: 1.5 },
    { id: 3, name: '1.0', value: 1.0 },
  ]

  const authUser = useAuthUserState()

  const onChangeDescription = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateDescription(event.target.value)
  }

  const [isDefenseSelected, setIsDefenseSelected] = useState(false)
  const [isSpDefenseSelected, setIsSpDefenseSelected] = useState(false)

  const onClickCalcDurabilityAdjustmentButton = () => {
    durabilityAdjustment(
      calcStyle,
      selectDefenseEnhancement,
      selectSpDefenseEnhancement
    )

    if (closeDialog) {
      closeDialog()
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item md={6} mt={2}>
        <MyCard>
          <MyCardTitle>耐久指数</MyCardTitle>
          <Typography variant="body1" gutterBottom sx={{ px: 2, pb: 1 }}>
            総合：{physicalDurability() + specialDurability()}
            <br />
            物理：{physicalDurability()}
            <br />
            特殊：{specialDurability()}
          </Typography>
        </MyCard>
      </Grid>
      <Grid item md={6} sx={{ textAlign: 'center' }}>
        <AdCode
          slot="1632034496"
          responsive="true"
          style={{ display: 'inline-block', width: '212px', height: '145px' }}
        />
      </Grid>
      <Grid item xs={12}>
        <MyCard>
          <CardContent sx={{ pb: 0 }}>
            <Typography variant="h5" align="center">
              耐久調整
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              最も理想的な配分で、余りの努力値をHBDに振り分けます。
            </Typography>
            <Grid container>
              <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Card elevation={0}>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: (theme) =>
                          isDefenseSelected || isSpDefenseSelected
                            ? theme.palette.primary.main
                            : 'initial',
                      }}
                    >
                      倍率
                    </Typography>
                    <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                      <InputLabel>防御</InputLabel>
                      <Select
                        value={selectDefenseEnhancement}
                        onChange={updateSelectDefenseEnhancement}
                        onFocus={() => setIsDefenseSelected(true)}
                        onBlur={() => setIsDefenseSelected(false)}
                        sx={{ textAlign: 'left' }}
                      >
                        {magnificationItems.map((item) => (
                          <MenuItem key={item.id} value={item.value}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
                      <InputLabel>特防</InputLabel>
                      <Select
                        value={selectSpDefenseEnhancement}
                        onChange={updateSelectSpDefenseEnhancement}
                        onFocus={() => setIsSpDefenseSelected(true)}
                        onBlur={() => setIsSpDefenseSelected(false)}
                        sx={{ textAlign: 'left' }}
                      >
                        {magnificationItems.map((item) => (
                          <MenuItem key={item.id} value={item.value}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={8} sx={{ textAlign: 'center' }}>
                <Card elevation={0}>
                  <CardContent>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        計算スタイル
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={calcStyle}
                        onChange={updateCalcStyle}
                      >
                        <FormControlLabel
                          control={<Radio />}
                          label="バランス - HBD/(B+D)"
                          value="balance"
                        />
                        <FormControlLabel
                          control={<Radio />}
                          label="総合耐久 - H=B+D"
                          value="performance"
                        />
                      </RadioGroup>
                    </FormControl>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ pt: 0, pb: 1.5 }}>
            <Grid container>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={onClickCalcDurabilityAdjustmentButton}
                >
                  耐久調整を計算する
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </MyCard>
      </Grid>
      <Grid item xs={12}>
        <TextField
          value={description}
          variant="outlined"
          rows={4.5}
          multiline
          fullWidth
          placeholder="ポケモンの説明（例：○○の××確定耐え）"
          onChange={onChangeDescription}
        />
      </Grid>
      {!isDialog && (
        <Grid
          item
          xs={12}
          sx={{ textAlign: 'center' }}
          display="flex"
          justifyContent="space-around"
        >
          <Button color="error" variant="outlined" onClick={resetEffortValue}>
            努力値リセット
          </Button>
          <LoadingButton
            variant="contained"
            onClick={submit}
            disabled={!authUser}
            loading={isLoading}
          >
            {buttonText}
          </LoadingButton>
        </Grid>
      )}
    </Grid>
  )
})
