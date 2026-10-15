import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cart } from './Cart';

const meta = {
  component: Cart,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Cart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
