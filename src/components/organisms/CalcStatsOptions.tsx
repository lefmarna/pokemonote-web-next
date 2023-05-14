import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { ChangeEvent, memo, useState } from 'react'
import { NullableStats, Stats } from '@/types'
import { useAuthUserState } from '@/store/authUserState'
import { LoadingButton } from '@mui/lab'

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
}

export const CalcStatsOptions = memo((props: Props) => {
  const {
    buttonText,
    description,
    realNumbers,
    isLoading,
    updateEvs,
    durabilityAdjustment,
    submit,
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
        <Box>耐久調整</Box>
        <Box>最も理想的な配分で、余りの努力値をHBDに振り分けます。</Box>
        <Grid container>
          <Grid item xs={4}>
            <Box>倍率</Box>
            <Box>
              <FormControl>
                <InputLabel>防御</InputLabel>
                <Select
                  value={selectDefenceEnhancement}
                  onChange={updateSelectDefenceEnhancement}
                  input={<OutlinedInput label="Tag" />}
                >
                  {magnificationItems.map((item) => (
                    <MenuItem key={item.id} value={item.value}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>特防</InputLabel>
                <Select
                  value={selectSpDefenceEnhancement}
                  onChange={updateSelectSpDefenceEnhancement}
                  input={<OutlinedInput label="Tag" />}
                >
                  {magnificationItems.map((item) => (
                    <MenuItem key={item.id} value={item.value}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              {/* <Box>計算スタイル</Box> */}
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  計算スタイル
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
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
            </Box>
          </Grid>
        </Grid>
        <Box>
          <Button
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
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TextField value={description} multiline />
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
          投稿する
        </LoadingButton>
      </Grid>
    </Grid>
  )
})
