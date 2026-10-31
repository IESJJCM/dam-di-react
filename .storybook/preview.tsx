import type { Preview } from '@storybook/react-vite';
import { CartProvider } from '../src/context';
import { CART_STORAGE_KEY } from '../src/hooks';
import '../src/index.css';
import { createMemoryRouter, RouterProvider } from 'react-router';

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    (Story, { parameters }) => {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(parameters.cart ?? [])
      );

      if (parameters.router === false) return <Story />;

      const router = createMemoryRouter([
        {
          path: '*',
          element: (
            <CartProvider>
              <Story />
            </CartProvider>
          ),
        },
      ]);
      return <RouterProvider router={router} />;
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
