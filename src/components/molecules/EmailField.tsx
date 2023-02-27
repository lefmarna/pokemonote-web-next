import { Email } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { ChangeEvent } from 'react'

type Props = {
  name?: string
  label?: string
  value?: string
  required?: boolean
  setValue: (value: string) => void
}

export const EmailField = (props: Props) => {
  const { name, label = 'メールアドレス', value, required = false, setValue } = props

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <TextField
      name={name}
      type="email"
      label={label}
      value={value}
      required={required}
      variant="standard"
      autoComplete="email"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Email />
          </InputAdornment>
        ),
      }}
      onChange={onChange}
    />
  )
}
