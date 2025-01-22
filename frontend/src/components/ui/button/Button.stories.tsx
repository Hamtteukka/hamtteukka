import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/ui/button/Button';

const meta = {
  title: 'ui/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    type: {
      control: 'select',
      options: ['filled', 'outlined', 'primary-filled', 'primary-outlined', 'warning-filled', 'warning-outlined'],
    },
    className: { control: 'text' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FilledStory: Story = {
  args: {
    children: 'Button',
    onClick: () => {},
    type: 'filled',
  },
};

export const OutlinedStory: Story = {
  args: {
    children: 'Button',
    onClick: () => {},
    type: 'outlined',
  },
};

export const PrimaryFilledStory: Story = {
  args: {
    children: 'Button',
    onClick: () => {},
    type: 'primary-filled',
  },
};

export const PrimaryOutlinedStory: Story = {
  args: {
    children: 'Button',
    onClick: () => {},
    type: 'primary-outlined',
  },
};

export const WarningFilledStory: Story = {
  args: {
    children: 'Button',
    onClick: () => {},
    type: 'warning-filled',
  },
};

export const WarningOutlinedStory: Story = {
  args: {
    children: 'Button',
    onClick: () => {},
    type: 'warning-outlined',
  },
};
