import { useEffect, useState } from 'react';
import type { Guitar, CartItem } from '../types';

/** Minimum quantity of a guitar in the cart. Below it, the line is removed. */
export const MIN_ITEMS = 1;

/** Maximum quantity of the same guitar in the cart. */
export const MAX_ITEMS = 5;

/** Key used to persist the cart in `localStorage`. */
export const CART_STORAGE_KEY = 'guitarla-cart';

/**
 * Reads the cart saved in `localStorage`.
 *
 * @returns The saved items, or an empty array when there is nothing saved.
 */
const loadCart = (): CartItem[] => {
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

/**
 * Manages the shopping cart of GuitarLA.
 *
 * The cart is restored from `localStorage` on the first render and saved
 * again every time it changes, so it survives a page reload.
 *
 * @example
 * ```tsx
 * const { cart, addToCart, clearCart } = useCart();
 *
 * <Guitar guitar={guitar} onAddToCart={addToCart} />
 * ```
 *
 * @returns The cart items and the functions to modify them.
 */
export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  /**
   * Adds a guitar to the cart. If it is already there, its quantity is
   * incremented up to {@link MAX_ITEMS}.
   *
   * @param guitar - The guitar to add.
   */
  const addToCart = (guitar: Guitar) => {
    const exists = cart.find((item) => item.id === guitar.id);

    if (exists) {
      if (exists.quantity < MAX_ITEMS) {
        setCart(
          cart.map((item) =>
            item.id === guitar.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      }
    } else {
      setCart([...cart, { ...guitar, quantity: 1 }]);
    }
  };

  /**
   * Increments the quantity of a line, up to {@link MAX_ITEMS}.
   *
   * @param id - The id of the guitar.
   */
  const increaseQuantity = (id: CartItem['id']) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity < MAX_ITEMS
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  /**
   * Decrements the quantity of a line, down to {@link MIN_ITEMS}.
   *
   * @param id - The id of the guitar.
   */
  const decreaseQuantity = (id: CartItem['id']) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > MIN_ITEMS
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  /**
   * Removes a line from the cart, whatever its quantity.
   *
   * @param id - The id of the guitar.
   */
  const removeFromCart = (id: CartItem['id']) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  /**
   * Removes a line from the cart, whatever its quantity.
   *
   * @param id - The id of the guitar.
   */
  const clearCart = () => {
    setCart([]);
  };

  return {
    /** The lines of the cart, each guitar with its quantity. */
    cart,
    // Methods
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  };
};
