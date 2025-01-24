import type { Meta, StoryObj } from '@storybook/react';
import TextInput from '@/components/ui/input/TextInput';

const meta = {
  title: 'ui/input/TextInput',
  component: TextInput,
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DropdownStory: Story = {
  args: {
    onChange: () => {},
    placeholder: '플레이스 홀더입니다.',
  },
};
