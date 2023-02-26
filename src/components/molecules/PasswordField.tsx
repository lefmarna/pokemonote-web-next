import { EnhancedEncryption, Visibility, VisibilityOff } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { ChangeEvent, memo, useState } from 'react'

type Props = {
  name?: string
  label?: string
  value?: string
  required?: boolean
  updatePassword: (event: ChangeEvent<HTMLInputElement>) => void
}

export const PasswordField = memo((props: Props) => {
  const { name, label = 'パスワード', value, required = false, updatePassword } = props

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
