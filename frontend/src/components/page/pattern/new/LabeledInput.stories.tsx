import type { Meta, StoryObj } from '@storybook/react';
import LabeledInput from '@/components/pattern/new/LabeledInput';
import { patternInput } from '@/lib/pattern';

const meta = {
  title: 'input/LabeledInput',
  component: LabeledInput,
  argTypes: {
    label: {
      type: 'string',
      control: 'text',
    },
    help: {
      type: 'string',
      control: 'text',
    },
    input: {
      description: 'input 컴포넌트',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LabeledInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LabeledInputStory: Story = {
  args: {
    label: patternInput.size.label,
    help: patternInput.size.help,
    input: <div>input에 해당하는 영역입니다.</div>,
  },
};
