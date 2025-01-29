import Tabs from '@/components/ui/tabs/Tabs';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'ui/Tabs',
  component: Tabs,
  argTypes: {
    tabList: {
      control: 'check',
      options: ['tab 1', 'tab 2', 'tab 3'],
    },
    tabPanels: {
      control: 'check',
      options: ['panel 1', 'panel 2', 'panel 3'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Slider: Story = {
  args: {
    tabList: ['tab 1', 'tab 2', 'tab 3'],
    tabPanels: ['panel 1', 'panel 2', 'panel 3'],
  },
};
