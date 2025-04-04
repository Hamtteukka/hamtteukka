import type { Meta, StoryObj } from '@storybook/react';
import NewPatternLanding from '@/components/ui/landing/NewPatternLanding';

const meta = {
  title: 'ui/landing/NewPatternLanding',
  component: NewPatternLanding,
  argTypes: {
    message: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NewPatternLanding>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NewPatternLandingStory: Story = {
  args: {
    message: '도안을 만들고 있어요...',
  },
};
