import type { Meta, StoryObj } from '@storybook/react';
import { H1, H2, H3, H4 } from '@/components/typography/Heading';

const meta = {
  title: 'typography/Heading',
  component: H1,
  argTypes: {
    children: {
      control: 'object',
    },
    className: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof H1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading: Story = {
  args: {
    children: '',
  },
  render: () => {
    return (
      <div>
        <H1>Heading 1</H1>
        <H2>Heading 2</H2>
        <H3>Heading 3</H3>
        <H4>Heading 4</H4>
      </div>
    );
  },
};
