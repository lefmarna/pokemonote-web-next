import { emailValidation } from '@/utils/regex'
import { Email } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { ChangeEvent, FocusEvent, useState } from 'react'

type Props = {
  name?: string
  label?: string
  value?: string
  required?: boolean
  setValue: (value: string) => void
}

export const EmailField = (props: Props) => {
  const {
    name,
    label = 'メールアドレス',
    value,
    required = false,
    setValue,
  } = props

  const [localValidateMessage, setLocalValidateMessage] = useState<string>('')
  const [prevLocalValidateMessage, setPrevLocalValidateMessage] =
    useState<string>('')

  const validateRules = {
    required: {
      rule: (value: string) => value.length === 0,
      label: 'この項目は必須です',
    },
    format: {
      rule: (value: string) => !emailValidation.test(value),
      label: 'メールアドレスは有効ではありません',
    },
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value
    setValue(newEmail)

    if (prevLocalValidateMessage === '') return

    const prevLocalValidateRule = Object.values(validateRules).find(
      (validateRule) => {
        return validateRule.label === prevLocalValidateMessage
      }
    )

    if (prevLocalValidateRule?.rule(newEmail)) {
      setLocalValidateMessage(prevLocalValidateRule.label)
    } else {
      setLocalValidateMessage('')
    }
  }

  const validateEmail = (e: FocusEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    const targetValidationRule = Object.values(validateRules).find(
      (validateRule) => {
        return validateRule.rule(newEmail)
      }
    )
    setLocalValidateMessage(targetValidationRule?.label ?? '')
    setPrevLocalValidateMessage(targetValidationRule?.label ?? '')
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
      InputLabelProps={{
        required: false,
      }}
      error={localValidateMessage !== ''}
      helperText={localValidateMessage}
      onChange={onChange}
      onBlur={validateEmail}
    />
  )
}
