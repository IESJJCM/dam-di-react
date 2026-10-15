import type { Meta, StoryObj } from '@storybook/react-vite';
import { Guitar } from './Guitar';

const meta = {
  component: Guitar,
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
