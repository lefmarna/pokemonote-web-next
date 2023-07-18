import { LoadingButton } from '@mui/lab'
import {
  Box,
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
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { ChangeEvent, memo, useState } from 'react'
import { useAuthUserState } from '@/store/authUserState'
import type { NullableStats, Stats } from '@/types'

type Props = {
  buttonText: string
  description: string
  realNumbers: Stats
  isLoading: boolean
  updateEvs: (newIvs: Partial<NullableStats>) => void
  durabilityAdjustment: (
    calcStyle: string,
    selectDefenceEnhancement: number,
    selectSpDefenceEnhancement: number
  ) => void
  submit: () => void
  updateDescription: (newDescription: string) => void
}

export const CalcStatsOptions = memo(function CalcStatsOptions(props: Props) {
  const {
    buttonText,
    description,
    realNumbers,
    isLoading,
    updateEvs,
    durabilityAdjustment,
    submit,
    updateDescription,
  } = props

  const [selectDefenceEnhancement, setSelectDefenceEnhancement] = useState(1)
  const [selectSpDefenceEnhancement, setSelectSpDefenceEnhancement] =
    useState(1)
  const [calcStyle, setCalcStyle] = useState('balance')

  const updateSelectDefenceEnhancement = (event: SelectChangeEvent<number>) => {
    setSelectDefenceEnhancement(Number(event.target.value))
  }
  const updateSelectSpDefenceEnhancement = (
    event: SelectChangeEvent<number>
  ) => {
    setSelectSpDefenceEnhancement(Number(event.target.value))
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
      Math.floor(realNumbers.defense * selectDefenceEnhancement)
    )
  }

  // 特殊耐久指数を求める
  const specialDurability = () => {
    return (
      realNumbers.hp *
      Math.floor(realNumbers.spDefense * selectSpDefenceEnhancement)
    )
  }

  // 努力値をリセットする
  const resetEffortValue = (): void => {
    updateEvs({
      hp: '',
      attack: '',
      defense: '',
      spAttack: '',
      spDefense: '',
      speed: '',
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

  const [isDefenceSelected, setIsDefenceSelected] = useState(false)
  const [isSpDefenceSelected, setIsSpDefenceSelected] = useState(false)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box>耐久指数</Box>
        <Typography variant="body1" gutterBottom>
          総合：{physicalDurability() + specialDurability()}
          <br />
          物理：{physicalDurability()}
          <br />
          特殊：{specialDurability()}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        公開
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ borderRadius: '16px' }}>
          <CardContent>
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
                          isDefenceSelected || isSpDefenceSelected
                            ? theme.palette.primary.main
                            : 'initial',
                      }}
                    >
                      倍率
                    </Typography>
                    <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                      <InputLabel>防御</InputLabel>
                      <Select
                        value={selectDefenceEnhancement}
                        onChange={updateSelectDefenceEnhancement}
                        onFocus={() => setIsDefenceSelected(true)}
                        onBlur={() => setIsDefenceSelected(false)}
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
                        value={selectSpDefenceEnhancement}
                        onChange={updateSelectSpDefenceEnhancement}
                        onFocus={() => setIsSpDefenceSelected(true)}
                        onBlur={() => setIsSpDefenceSelected(false)}
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
          <CardActions>
            <Grid container>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() =>
                    durabilityAdjustment(
                      calcStyle,
                      selectDefenceEnhancement,
                      selectSpDefenceEnhancement
                    )
                  }
                >
                  耐久調整を計算する
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <TextField
          value={description}
          variant="outlined"
          rows={5}
          multiline
          fullWidth
          placeholder="ポケモンの説明（例：○○の××確定耐え）"
          onChange={onChangeDescription}
        />
      </Grid>
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
    </Grid>
  )
})
