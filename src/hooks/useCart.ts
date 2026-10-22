import { useState } from "react";
import type { Guitar, CartItem } from "../types";

export const MIN_ITEMS = 1;
export const MAX_ITEMS = 5;

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

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

  const increaseQuantity = (id: CartItem["id"]) => {
    setCart(cart.map((item) =>
      item.id === id && item.quantity < MAX_ITEMS ?
        { ...item, quantity: item.quantity + 1 } :
        item
    ));
  };


  const decreaseQuantity = (id: CartItem["id"]) => {
    setCart(cart.map((item) =>
      item.id === id && item.quantity > MIN_ITEMS ?
        { ...item, quantity: item.quantity - 1 } :
        item
    ));
  };

  const removeFromCart = (id: CartItem["id"]) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  }

  return {
    cart,
    // Methods
    addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart
  };
}

