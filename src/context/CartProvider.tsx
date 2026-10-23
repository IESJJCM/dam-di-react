import type { ReactNode } from 'react';
import { useCart } from '../hooks';
import { CartContext } from './CartContext';

type CartProviderProps = {
  children: ReactNode;
};

/** Creates the single cart of the app and makes it available to its children. */
export const CartProvider = ({ children }: CartProviderProps) => {
  const cart = useCart();

  return <CartContext value={cart}>{children}</CartContext>;
};
