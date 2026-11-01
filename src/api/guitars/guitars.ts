import { supabase } from '../../lib/supabase';
import type { Guitar } from '../../types';

/** A row of the `guitars` table, as Supabase returns it. */
type GuitarRow = {
  id: number;
  name: string;
  description: string;
  price: number;
  /** Path of the image inside the `guitars` bucket, e.g. `guitarra_01.jpg`. */
  image: string;
};

const TABLE = 'guitars';
const BUCKET = 'guitars';
const COLUMNS = 'id, name, description, price, image';

/** Turns a row into a guitar of the app, with the public URL of its image. */
const toGuitar = (row: GuitarRow): Guitar => ({
  ...row,
  image: supabase.storage.from(BUCKET).getPublicUrl(row.image).data.publicUrl,
});

/**
 * Loads the whole catalogue, ordered by id.
 *
 * @throws An error with the message from Supabase when the query fails.
 */
export const getGuitars = async (): Promise<Guitar[]> => {
  const { data, error } = await supabase
    .from(TABLE)
    .select(COLUMNS)
    .order('id')
    .overrideTypes<GuitarRow[]>();

  if (error) throw new Error(error.message);

  return data.map(toGuitar);
};

/**
 * Loads one guitar by its id.
 *
 * @returns The guitar, or `null` when there is none with that id.
 * @throws An error with the message from Supabase when the query fails.
 */
export const getGuitar = async (id: number): Promise<Guitar | null> => {
  const { data, error } = await supabase
    .from(TABLE)
    .select(COLUMNS)
    .eq('id', id)
    .maybeSingle()
    .overrideTypes<GuitarRow>();

  if (error) throw new Error(error.message);

  return data ? toGuitar(data) : null;
};
