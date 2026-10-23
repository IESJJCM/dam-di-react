import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { CartProvider } from '../context';
import { CART_STORAGE_KEY } from '../hooks';
import type { CartItem } from '../types';

type Options = RenderOptions & {
  /** Lines the cart starts with; they are written to localStorage first. */
  cart?: CartItem[];
};

/** Renders a component inside the providers of the app, like `App` does. */
export const renderWithProviders = (
  ui: ReactElement,
  { cart = [], ...options }: Options = {}
) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};
