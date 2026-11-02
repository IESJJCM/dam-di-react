/** A guitar of the catalogue, as stored in `src/data/db.ts`. */
export type Guitar = {
  /** Unique identifier. */
  id: number;
  /** Name shown on the card. */
  name: string;
  /** Public URL of the image. */
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

/** The data of the new guitar form, already validated. */
export type NewGuitar = {
  name: string;
  description: string;
  price: number;
  /** The image chosen in the form; it is uploaded to Storage. */
  image: File;
};

/** One message per field that failed the validation of the new guitar form. */
export type NewGuitarErrors = Partial<Record<keyof NewGuitar, string>>;
