import { useState } from "react";
import type { Guitar, CartItem } from "../types";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (guitar: Guitar) => {
    const exists = cart.find((item) => item.id === guitar.id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === guitar.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...guitar, quantity: 1 }]);
    }
  };


  return { cart, addToCart };
}

