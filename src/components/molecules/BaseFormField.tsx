import { InputAdornment, TextField } from '@mui/material'
import { ChangeEvent, FocusEvent, ReactElement, useState } from 'react'

type ValidateRules = {
  [key: string]: {
    rule: (value: string) => boolean
    label: string
  }
}

type Props = {
  type?: string
  label?: string
  value?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
  validateRules: ValidateRules
  updateValue: (newValue: string) => void
  StartIcon?: ReactElement
  EndIcon?: ReactElement
}

export const BaseFormField = (props: Props) => {
  const { validateRules, updateValue, StartIcon, EndIcon, ...textFieldProps } =
    props

  const [localValidateMessage, setLocalValidateMessage] = useState<string>('')
  const [prevLocalValidateMessage, setPrevLocalValidateMessage] =
    useState<string>('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    updateValue(newValue)

    if (prevLocalValidateMessage === '') return

    const prevLocalValidateRule = Object.values(validateRules).find(
      (validateRule) => {
        return validateRule.label === prevLocalValidateMessage
      }
    )

    if (prevLocalValidateRule?.rule(newValue)) {
      setLocalValidateMessage(prevLocalValidateRule.label)
    } else {
      setLocalValidateMessage('')
    }
  }

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    const targetValidationRule = Object.values(validateRules).find(
      (validateRule) => {
        return validateRule.rule(newValue)
      }
    )
    setLocalValidateMessage(targetValidationRule?.label ?? '')
    setPrevLocalValidateMessage(targetValidationRule?.label ?? '')
  }

  return (
    <TextField
      type="text"
      variant="standard"
      {...textFieldProps}
      InputProps={{
        startAdornment: StartIcon && (
          <InputAdornment position="start">{StartIcon}</InputAdornment>
        ),
        endAdornment: EndIcon && (
          <InputAdornment position="end">{EndIcon}</InputAdornment>
        ),
      }}
      InputLabelProps={{
        required: false,
      }}
      error={localValidateMessage !== ''}
      helperText={localValidateMessage}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}
