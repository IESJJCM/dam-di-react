import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { db } from '../../data/db';
import { Cart } from './Cart';

const meta = {
  component: Cart,
  args: {
    onClose: fn(),
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Cart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithItems: Story = {
  parameters: {
    cart: [
      { ...db[0], quantity: 2 },
      { ...db[1], quantity: 1 },
    ],
  },
};
