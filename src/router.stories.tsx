import type { Meta, StoryObj } from '@storybook/react-vite';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { userEvent } from 'storybook/test';
import { routes } from './router';

const App = ({ route }: { route: string }) => (
  <RouterProvider
    router={createMemoryRouter(routes, { initialEntries: [route] })}
  />
);

const meta = {
  title: 'App',
  component: App,
  parameters: {
    layout: 'fullscreen',
    router: false,
  },
  args: {
    route: '/',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Catalogue: Story = {};

export const GuitarDetail: Story = {
  args: { route: '/guitars/3' },
};

export const NewGuitar: Story = {
  args: { route: '/guitars/new' },
};

export const NewGuitarWithErrors: Story = {
  args: { route: '/guitars/new' },
  play: async ({ canvas }) => {
    await userEvent.click(
      await canvas.findByRole('button', { name: 'Guardar guitarra' })
    );
  },
};

export const NotFound: Story = {
  args: { route: '/no-existe' },
};
