import type { Meta, StoryObj } from '@storybook/react';
import TextArea from '@/components/ui/input/TextArea';

const meta = {
  title: 'ui/input/TextArea',
  component: TextArea,
  tags: ['autodocs'],
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DropdownStory: Story = {
  args: {
    onChange: () => {},
    placeholder: '플레이스 홀더입니다.',
    minHeight: 144,
  },
};
