import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { CartProvider } from '../context';
import { CART_STORAGE_KEY } from '../hooks';
import { routes } from '../router';
import type { CartItem } from '../types';

type Options = {
  /** Lines the cart starts with; they are written to localStorage first. */
  cart?: CartItem[];
  /** The URL the router starts at. */
  route?: string;
};

/**
 * Renders a component inside the providers of the app: a router in memory
 * and the cart, like `Layout` does for every page.
 */
export const renderWithProviders = (
  ui: ReactElement,
  { cart = [], route = '/' }: Options = {}
) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));

  const router = createMemoryRouter(
    [{ path: '*', element: <CartProvider>{ui}</CartProvider> }],
    { initialEntries: [route] }
  );

  return render(<RouterProvider router={router} />);
};

/** Renders the whole app, with its real routes, starting at `route`. */
export const renderApp = (route = '/') => {
  const router = createMemoryRouter(routes, { initialEntries: [route] });

  return render(<RouterProvider router={router} />);
};
