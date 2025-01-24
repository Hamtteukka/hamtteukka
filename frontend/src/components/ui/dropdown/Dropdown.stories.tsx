import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from '@/components/ui/dropdown/Dropdown';

const meta = {
  title: 'ui/Dropdown',
  component: Dropdown,
  argTypes: {
    list: {
      control: 'select',
      options: ['선택 1', '선택 2', '선택 3'],
    },
    value: {
      description: '선택된 옵션',
    },
    onClick: {
      description: '옵션의 클릭 이벤트 핸들러 함수',
    },
    placeholder: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DropdownStory: Story = {
  args: {
    list: ['선택 1', '선택 2', '선택 3'],
    onClick: () => {},
    placeholder: '선택',
  },
};
