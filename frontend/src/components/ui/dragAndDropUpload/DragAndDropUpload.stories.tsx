import type { Meta, StoryObj } from '@storybook/react';
import dynamic from 'next/dynamic';

const DragAndDropUploadImg = dynamic(() => import('@/components/ui/dragAndDropUpload/DragAndDropUpload'));

const meta = {
  title: 'ui/DragAndDropUpload',
  component: DragAndDropUploadImg,
  argTypes: {
    setImage: {
      description: '이미지 파일 핸들러 함수',
    },
    className: { control: 'text' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DragAndDropUploadImg>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DragAndDropUploadImgStory: Story = {
  args: {
    setImage: () => {},
  },
};
