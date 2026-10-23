import type { CartItem } from '../types';

/** Two lines of cart used across the tests: 2 × 299 + 1 × 349 = 947. */
export const cartItems: CartItem[] = [
  {
    id: 1,
    name: 'Lukather',
    image: 'guitarra_01',
    description: 'Una guitarra de prueba',
    price: 299,
    quantity: 2,
  },
  {
    id: 2,
    name: 'SRV',
    image: 'guitarra_02',
    description: 'Otra guitarra de prueba',
    price: 349,
    quantity: 1,
  },
];