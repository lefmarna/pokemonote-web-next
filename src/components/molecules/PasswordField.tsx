import { EnhancedEncryption, Visibility, VisibilityOff } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'

type Props = {
  name?: string
  label?: string
  value?: string
  required?: boolean
  setValue: (value: string) => void
}

export const PasswordField = (props: Props) => {
  const { name, label = 'パスワード', value, required = false, setValue } = props

  const [isVisibilityIcon, setIsVisibilityIcon] = useState(true)
  // const [type, setType] = useState('password')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const getType = () => {
    if (isVisibilityIcon) return 'password'
    return 'text'
  }

  const toggleVisibilityIcon = () => {
    setIsVisibilityIcon(!isVisibilityIcon)
  }

  return (
    <TextField
      name={name}
      type={getType()}
      label={label}
      value={value}
      required={required}
      variant="standard"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <EnhancedEncryption />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="start">
            {isVisibilityIcon ? (
              <VisibilityOff onClick={toggleVisibilityIcon} />
            ) : (
              <Visibility onClick={toggleVisibilityIcon} />
            )}
          </InputAdornment>
        ),
      }}
      onChange={onChange}
    />
  )
}
