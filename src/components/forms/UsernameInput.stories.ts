import type { Meta, StoryObj } from '@storybook/react'
import { UsernameInput } from '@/components/forms/UsernameInput'

const meta: Meta<typeof UsernameInput> = {
  title: 'forms/UsernameInput',
  component: UsernameInput,
}

export default meta

type Story = StoryObj<typeof UsernameInput>

export const UsernameInputStory: Story = {
  args: {},
}
