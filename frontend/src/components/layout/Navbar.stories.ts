import type { Meta, StoryObj } from '@storybook/react';
import Navbar from '@/components/layout/Navbar';

const meta = {
  title: 'layout/Navbar',
  component: Navbar,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavbarStory: Story = {};
