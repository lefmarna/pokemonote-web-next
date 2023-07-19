import { EmailInput } from '@/components/forms/EmailInput'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof EmailInput> = {
  title: 'forms/EmailInput',
  component: EmailInput,
}

export default meta

type Story = StoryObj<typeof EmailInput>

export const EmailInputStory: Story = {
  args: {},
}
