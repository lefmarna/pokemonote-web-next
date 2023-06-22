import { AccountBox } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { ChangeEvent, FocusEvent, memo, useState } from 'react'

type Props = {
  label?: string
  value?: string
  required?: boolean
  setValue: (value: string) => void
}

export const UsernameField = memo(function EmailField(props: Props) {
  const { label = 'ユーザー名', value, required = false, setValue } = props

  const [localValidateMessage, setLocalValidateMessage] = useState<string>('')
  const [prevLocalValidateMessage, setPrevLocalValidateMessage] =
    useState<string>('')

  const validateRules = {
    required: {
      rule: (value: string) => value.length === 0,
      label: 'この項目は必須です',
    },
    format: {
      rule: (value: string) => !/^[a-z\d]{5,15}$/i.test(value),
      label: '英数5〜15文字で入力してください。',
    },
  }

  const onChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    const newUserName = event.target.value
    setValue(newUserName)

    if (prevLocalValidateMessage === '') return

    const prevLocalValidateRule = Object.values(validateRules).find(
      (validateRule) => {
        return validateRule.label === prevLocalValidateMessage
      }
    )

    if (prevLocalValidateRule?.rule(newUserName)) {
      setLocalValidateMessage(prevLocalValidateRule.label)
    } else {
      setLocalValidateMessage('')
    }
  }

  const validateUserName = (e: FocusEvent<HTMLInputElement>) => {
    const newUsername = e.target.value
    const targetValidationRule = Object.values(validateRules).find(
      (validateRule) => {
        return validateRule.rule(newUsername)
      }
    )
    setLocalValidateMessage(targetValidationRule?.label ?? '')
    setPrevLocalValidateMessage(targetValidationRule?.label ?? '')
  }

  return (
    <TextField
      type="text"
      label={label}
      placeholder="英数5〜15文字で入力してください。"
      value={value}
      required={required}
      variant="standard"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountBox />
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        required: false,
      }}
      error={localValidateMessage !== ''}
      helperText={localValidateMessage}
      onChange={onChangeUserName}
      onBlur={validateUserName}
    />
  )
})
