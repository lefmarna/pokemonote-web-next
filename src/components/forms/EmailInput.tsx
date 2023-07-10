import { Email } from '@mui/icons-material'
import { memo } from 'react'
import { BaseFormInput } from '@/components/forms/BaseFormInput'

type Props = {
  label?: string
  value?: string
  required?: boolean
  setValue: (value: string) => void
}

export const EmailInput = memo(function EmailInput(props: Props) {
  const { label = 'メールアドレス', value, required = false, setValue } = props

  const emailValidation =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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

  return (
    <BaseFormInput
      type="email"
      label={label}
      value={value}
      required={required}
      autoComplete="email"
      validateRules={validateRules}
      updateValue={setValue}
      StartIcon={<Email />}
    />
  )
})
