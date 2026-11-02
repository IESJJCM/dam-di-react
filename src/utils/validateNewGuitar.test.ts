import { describe, expect, it } from 'vitest';
import { MAX_IMAGE_SIZE, validateNewGuitar } from './validateNewGuitar';

const image = new File(['x'], 'foto.jpg', { type: 'image/jpeg' });
const emptyImage = new File([], 'vacio.jpg', { type: 'image/jpeg' });
const pdf = new File(['x'], 'doc.pdf', { type: 'application/pdf' });
const hugeImage = new File([new Uint8Array(MAX_IMAGE_SIZE + 1)], 'grande.jpg', {
  type: 'image/jpeg',
});

/** A valid form; each test breaks one field of it. */
const valid = {
  name: 'Gibson',
  description: 'Una guitarra',
  price: '999',
  image,
};

const form = (fields: Record<string, string | File>) => {
  const formData = new FormData();
  for (const [name, value] of Object.entries(fields)) {
    formData.append(name, value);
  }
  return formData;
};

describe('validateNewGuitar', () => {
  it('returns the typed data when every field is valid', () => {
    const result = validateNewGuitar(form(valid));
    expect(result).toEqual({
      data: { name: 'Gibson', description: 'Una guitarra', price: 999, image },
    });
  });

  // One row per rule: the field that fails, the value that makes it fail
  // and the message the user should read.
  it.each([
    {
      field: 'name',
      value: '  ',
      message: 'Escribe el nombre de la guitarra.',
    },
    { field: 'description', value: '', message: 'Escribe una descripción.' },
    { field: 'price', value: '', message: 'Escribe un precio mayor que cero.' },
    {
      field: 'price',
      value: '-5',
      message: 'Escribe un precio mayor que cero.',
    },
    {
      field: 'price',
      value: 'gratis',
      message: 'Escribe un precio mayor que cero.',
    },
    {
      field: 'image',
      value: emptyImage,
      message: 'Elige una imagen de la guitarra.',
    },
    {
      field: 'image',
      value: pdf,
      message: 'El archivo tiene que ser una imagen (JPG, PNG o WebP).',
    },
    {
      field: 'image',
      value: hugeImage,
      message: 'La imagen no puede pesar más de 2 MB.',
    },
  ])('rejects $field = $value with "$message"', ({ field, value, message }) => {
    const result = validateNewGuitar(form({ ...valid, [field]: value }));
    expect(result.errors).toEqual({ [field]: message });
  });

  it('reports every empty field at once', () => {
    const result = validateNewGuitar(form({}));
    expect(Object.keys(result.errors ?? {})).toEqual([
      'name',
      'description',
      'price',
      'image',
    ]);
  });
});
