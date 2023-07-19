import { UsernameInput } from '@/components/forms/UsernameInput'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof UsernameInput> = {
  title: 'forms/UsernameInput',
  component: UsernameInput,
}

export default meta

type Story = StoryObj<typeof UsernameInput>

export const UsernameInputStory: Story = {
  args: {},
}
