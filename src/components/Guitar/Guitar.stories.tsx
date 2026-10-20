import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { db } from '../../data/db';
import { Guitar } from './Guitar';

const meta = {
  component: Guitar,
  args: {
    guitar: db[0],
    onAddToCart: fn(),
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Guitar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Expensive: Story = {
  args: {
    guitar: { ...db[0], name: 'Custom', price: 2499 },
  },
};
