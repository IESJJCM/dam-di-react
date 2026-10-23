import type { Preview } from '@storybook/react-vite';
import { CartProvider } from '../src/context';
import { CART_STORAGE_KEY } from '../src/hooks';
import '../src/index.css';

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    (Story, { parameters }) => {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(parameters.cart ?? [])
      );
      return (
        <CartProvider>
          <Story />
        </CartProvider>
      );
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
