import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Form, useActionData, useNavigation } from 'react-router';

import { useDocumentTitle } from '../../hooks';
import type { createGuitarAction } from '../../loaders';
import type { NewGuitarErrors } from '../../types';

const inputClass =
  'mt-1 w-full rounded border border-gray-300 px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 aria-[invalid=true]:border-red-700';

export const NewGuitar = () => {
  const actionData = useActionData<typeof createGuitarAction>();
  const errors: NewGuitarErrors = actionData?.errors ?? {};
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formRef = useRef<HTMLFormElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useDocumentTitle('Nueva guitarra · GuitarLA');

  // After a failed submit, focus goes to the first field with an error so
  // the user lands where they have to act and hears its label and message.
  useEffect(() => {
    if (!actionData?.errors) return;
    formRef.current
      ?.querySelector<HTMLElement>('[aria-invalid="true"]')
      ?.focus();
  }, [actionData]);

  // Object URLs keep the file in memory until they are revoked.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  /** aria-invalid and aria-describedby for a field, only when it has an error. */
  const fieldProps = (name: keyof NewGuitarErrors) => ({
    'aria-invalid': name in errors,
    'aria-describedby': name in errors ? `${name}-error` : undefined,
  });

  return (
    <>
      <h1 className="text-center text-4xl font-black">Nueva guitarra</h1>

      <Form
        ref={formRef}
        method="post"
        encType="multipart/form-data"
        noValidate
        className="mx-auto mt-10 flex max-w-xl flex-col gap-5"
      >
        <div>
          <label htmlFor="name" className="font-bold">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputClass}
            {...fieldProps('name')}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-700">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="font-bold">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            required
            className={inputClass}
            {...fieldProps('description')}
          />
          {errors.description && (
            <p id="description-error" className="mt-1 text-sm text-red-700">
              {errors.description}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="font-bold">
            Precio (dólares)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={1}
            step={1}
            required
            className={inputClass}
            {...fieldProps('price')}
          />
          {errors.price && (
            <p id="price-error" className="mt-1 text-sm text-red-700">
              {errors.price}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="image" className="font-bold">
            Imagen
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            required
            className={inputClass}
            onChange={handleImageChange}
            {...fieldProps('image')}
          />
          {errors.image && (
            <p id="image-error" className="mt-1 text-sm text-red-700">
              {errors.image}
            </p>
          )}
          {preview && (
            <img
              src={preview}
              alt="Vista previa de la imagen elegida"
              className="mx-auto mt-4 max-h-64 object-contain"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-gray-900 px-4 py-3 font-bold text-white uppercase transition hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-wait disabled:bg-gray-500"
        >
          {isSubmitting ? 'Guardando…' : 'Guardar guitarra'}
        </button>

        {/* Announced by screen readers when the upload starts. */}
        <p role="status" className="sr-only">
          {isSubmitting ? 'Guardando la guitarra…' : ''}
        </p>
      </Form>
    </>
  );
};
