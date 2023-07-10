import type { Meta, StoryObj } from '@storybook/react'
import { EmailInput } from '@/components/forms/EmailInput'

const meta: Meta<typeof EmailInput> = {
  title: 'forms/EmailInput',
  component: EmailInput,
}

export default meta

type Story = StoryObj<typeof EmailInput>

export const EmailInputStory: Story = {
  args: {},
}
