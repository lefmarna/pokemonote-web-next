import { EnhancedEncryption, Visibility, VisibilityOff } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { ChangeEvent, memo, useState } from 'react'

type Props = {
  name?: string
  label?: string
  value?: string
  required?: boolean
  autoComplete?: 'current-password' | 'new-password'
  updatePassword: (event: ChangeEvent<HTMLInputElement>) => void
}

export const PasswordField = memo((props: Props) => {
  const {
    name,
    label = 'パスワード',
    value,
    required = false,
    autoComplete = 'current-password',
    updatePassword,
  } = props

  const [isVisibilityIcon, setIsVisibilityIcon] = useState(true)

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
      autoComplete={autoComplete}
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
      onChange={updatePassword}
    />
  )
})
