import { createContext, useContext } from 'react';
import type { useCart } from '../hooks';

/** Everything `useCart` returns, shared with the whole app through context. */
export type CartContextValue = ReturnType<typeof useCart>;

export const CartContext = createContext<CartContextValue | null>(null);

/**
 * Reads the cart from the nearest {@link CartProvider}.
 *
 * @throws If there is no `CartProvider` above the component.
 */
export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used inside a CartProvider');
  }

  return context;
};
