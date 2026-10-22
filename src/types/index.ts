/** A guitar of the catalogue, as stored in `src/data/db.ts`. */
export type Guitar = {
  /** Unique identifier. */
  id: number;
  /** Name shown on the card. */
  name: string;
  /** File name of the image in `public/img/`, without extension. */
  image: string;
  /** Short description shown on the card. */
  description: string;
  /** Price in dollars. */
  price: number;
};

/** A line of the cart: a guitar plus how many units of it. */
export type CartItem = Guitar & {
  /** Units of this guitar in the cart. */
  quantity: number;
};
