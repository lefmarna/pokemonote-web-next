import type { Meta, StoryObj } from '@storybook/react'
import { PasswordInput } from '@/components/forms/PasswordInput'

const meta: Meta<typeof PasswordInput> = {
  title: 'forms/PasswordInput',
  component: PasswordInput,
}

export default meta

type Story = StoryObj<typeof PasswordInput>

export const PasswordInputStory: Story = {
  args: {},
}
