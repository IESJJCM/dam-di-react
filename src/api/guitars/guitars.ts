import { supabase } from '../../lib/supabase';
import type { Guitar, NewGuitar } from '../../types';

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

/** Builds a unique path for an uploaded image: `1730000000000-foto.jpg`. */
const toImagePath = (file: File) =>
  `${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-')}`;

/**
 * Uploads the image to the bucket and inserts the guitar.
 *
 * @returns The guitar as stored, with its new id and the URL of its image.
 * @throws An error with the message from Supabase when the upload or the
 * insert fails.
 */
export const createGuitar = async (input: NewGuitar): Promise<Guitar> => {
  const path = toImagePath(input.image);

  const upload = await supabase.storage.from(BUCKET).upload(path, input.image);
  if (upload.error) throw new Error(upload.error.message);

  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      name: input.name,
      description: input.description,
      price: input.price,
      image: path,
    })
    .select(COLUMNS)
    .single()
    .overrideTypes<GuitarRow>();

  if (error) throw new Error(error.message);

  return toGuitar(data);
};
