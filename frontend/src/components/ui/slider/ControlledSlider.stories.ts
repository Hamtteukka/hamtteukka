import type { Meta, StoryObj } from '@storybook/react';
import ControlledSlider from '@/components/ui/slider/ControlledSlider';

const meta = {
  title: 'ui/ControlledSlider',
  component: ControlledSlider,
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    defaultValue: { control: 'number' },
    onChange: {
      description: '슬라이더의 value를 전달하여 값 변경',
    },
    step: { control: 'number' },
    className: { control: 'text' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ControlledSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Slider: Story = {
  args: {
    min: 16,
    max: 128,
    defaultValue: 64,
    onChange: () => {},
  },
};
