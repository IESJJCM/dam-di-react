import type { NewGuitar, NewGuitarErrors } from '../types';

/** Largest image accepted, in bytes (2 MB). */
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

type Result = { data: NewGuitar; errors?: never } | { errors: NewGuitarErrors };

/**
 * Validates the fields of the new guitar form.
 *
 * @param formData - The submitted form, as the route action receives it.
 * @returns The typed data when everything is valid, or one message per
 * field that fails, written as what the user has to do.
 */
export const validateNewGuitar = (formData: FormData): Result => {
  const name = String(formData.get('name') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const price = Number(formData.get('price'));
  const image = formData.get('image');

  const errors: NewGuitarErrors = {};

  if (!name) errors.name = 'Escribe el nombre de la guitarra.';
  if (!description) errors.description = 'Escribe una descripción.';
  if (!formData.get('price') || Number.isNaN(price) || price <= 0) {
    errors.price = 'Escribe un precio mayor que cero.';
  }

  if (!(image instanceof File) || image.size === 0) {
    errors.image = 'Elige una imagen de la guitarra.';
  } else if (!image.type.startsWith('image/')) {
    errors.image = 'El archivo tiene que ser una imagen (JPG, PNG o WebP).';
  } else if (image.size > MAX_IMAGE_SIZE) {
    errors.image = 'La imagen no puede pesar más de 2 MB.';
  }

  if (Object.keys(errors).length > 0) return { errors };

  return { data: { name, description, price, image: image as File } };
};
