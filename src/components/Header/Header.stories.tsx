import type { Meta, StoryObj } from '@storybook/react-vite';
import { db } from '../../data/db';
import { Header } from './Header';

const meta = {
  component: Header,
  args: {
    cart: [],
  },

  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithItems: Story = {
  args: {
    cart: [
      { ...db[0], quantity: 2 },
      { ...db[1], quantity: 1 },
    ],
  },
};
