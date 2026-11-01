import { guitars } from '../api/guitars/__mocks__/guitars';
import type { CartItem } from '../types';

export { guitars };

/** Two lines of cart used across the tests: 2 × 299 + 1 × 349 = 947. */
export const cartItems: CartItem[] = [
  { ...guitars[0], quantity: 2 },
  { ...guitars[1], quantity: 1 },
];
