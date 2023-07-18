import { NicknameInput } from '@/components/forms/NicknameInput'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof NicknameInput> = {
  title: 'forms/NicknameInput',
  component: NicknameInput,
}

export default meta

type Story = StoryObj<typeof NicknameInput>

export const NicknameInputStory: Story = {
  args: {},
}
