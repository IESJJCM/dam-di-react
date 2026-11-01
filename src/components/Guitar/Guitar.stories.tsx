import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { guitars } from '../../test/fixtures';
import { Guitar } from './Guitar';

const meta = {
  component: Guitar,
  args: {
    guitar: guitars[0],
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
    guitar: { ...guitars[0], name: 'Custom', price: 2499 },
  },
};
